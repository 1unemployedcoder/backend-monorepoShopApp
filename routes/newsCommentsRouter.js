const Router = require('express')
const router = new Router()
const newsCommentsController = require('../controllers/newsCommentsController')
const interceptorMiddleware = require("../middleware/AuthInterceptorMiddleware");
const deleteAnyMiddleWare = require("../middleware/deleteAnyMiddleware");

router.post('/:id', interceptorMiddleware, newsCommentsController.create)
router.delete('/:id', deleteAnyMiddleWare, newsCommentsController.delete)

module.exports = router
