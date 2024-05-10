const Router = require('express')
const router = new Router()
const productsCommentsController = require('../controllers/productsCommentsController')
const interceptorMiddleware = require('../middleware/AuthInterceptorMiddleware')
const deleteAnyMiddleWare = require('../middleware/deleteAnyMiddleware')
router.post('/:id', interceptorMiddleware, productsCommentsController.create)
router.delete('/:id', deleteAnyMiddleWare, productsCommentsController.delete)


module.exports = router
