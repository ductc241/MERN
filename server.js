require('dotenv').config()
const express = require('express');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// app
const app = express()
app.use(express.json())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

// routes
app.use('/user', require('./routes/user.router'))

// connnect db
const URI = process.env.MONGO_URL
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port: ', PORT)
})