const Router = require('express')
const router = new Router()
const userController  = require('../controllers/userController')
const authMiddleware = require('../middleware/AuthMiddleware')
router.post('/login', userController.login)
router.post('/registration', userController.registration)
router.get('/auth', authMiddleware, userController.check)

module.exports = router
