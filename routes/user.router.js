const userController = require("../controllers/use.controller");
const router = require("express").Router();


router.post('/register', userController.register)

module.exports = router