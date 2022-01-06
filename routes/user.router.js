const router = require("express").Router();
const userController = require("../controllers/use.controller");
const authMiddleware = require("../middleware/auth");


router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/infor', authMiddleware, userController.getUser)

module.exports = router