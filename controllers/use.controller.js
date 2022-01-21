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
            res.json({ accessToken })

        } catch (error) {
            return res.status(500).json({
                msg: error.message
            })
        }
    },

    login: async (req, res) => {
        try {
            const { email, password} = req.body

            // check user infor
            const user = await Users.findOne({ email })
            if(!user) return res.status(400).json({ msg: 'Cant find user' })
            
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({ msg: 'Incorrect password' })
            

            // Response
            const accessToken = jwt.sign(
                {id: user._id},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            )

            const refreshToken = jwt.sign(
                {id: user._id},
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '2d' }
            )


            res.cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 24*60*60*1000
            })
            res.json({ accessToken })
            
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({ msg: 'Logged out' })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({ msg: 'User doesnt find' })
    
            res.json(user)     
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    refreshToken: (req, res) =>{
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) return res.status(400).json({msg: "Please Login or Register"})

                const accesstoken = jwt.sign(
                    {id: user.id},
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '2d' }
                )

                res.json({accesstoken})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }   
    },

    logout: async (req, res) =>{
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Logged out"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    
    addCart: async (req, res) =>{
        try {
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."})

            await Users.findOneAndUpdate({_id: req.user.id}, {
                cart: req.body.cart
            })

            return res.json({msg: "Added to cart"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = userController