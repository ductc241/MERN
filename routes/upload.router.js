const router = require("express").Router()
const cloudinary = require('../config/cloudinary')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const fs = require('fs')

router.post('/upload', (req, res) => {
    try {
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({ msg: 'No file upload' })
        }

        const file = req.files.file
        if(file.size > 1024*1024) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "Size too large"})
        }

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "File format is incorrect."})
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "Mern"}, async(err, result)=>{
            if(err) throw err;

            removeTmp(file.tempFilePath)

            res.json({public_id: result.public_id, url: result.secure_url})
        })

    } catch (error) {
        return res.status(500).json({ msg: error.massage })
    }
})

const removeTmp = (path) =>{
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}


module.exports = router