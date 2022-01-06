const router = require("express").Router();
const userController = require("../controllers/use.controller");
const auth = require("../middleware/auth");


router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/infor', auth, userController.getUser)

module.exports = router