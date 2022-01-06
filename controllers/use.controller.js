const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require("../models/user.model");

const userController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body

            // Check & Save User
            const user = await Users.findOne({email})
            if(user) 
                return res.status(400).json({ msg: 'This email already exists'})
            
            if(password.length < 6)
                return res.status(400).json({ msg: 'Password is too short'})
            
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email,
                password: passwordHash
            })
            await newUser.save()
            

            // Token
            const accessToken =  jwt.sign(
                {id: newUser._id},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            )

            const refreshToken = jwt.sign(
                {id: newUser._id},
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '2d' }
            )

            // Response
            res.cookie('refresh', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })

            res.json({ accessToken })

        } catch (error) {
            res.status(500).json({
                msg: error.message
            })
        }
    }
}


module.exports = userController