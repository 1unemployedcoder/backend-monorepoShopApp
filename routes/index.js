const Router = require('express')
const router = new Router()
const newsRouter = require('./newsRouter')
const productsRouter = require('./productsRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const productComments = require('./productCommentsRouter')
const newsComments = require('./newsCommentsRouter')

router.use('/news', newsRouter)
router.use('/products', productsRouter)
router.use('/type', typeRouter)
router.use('/user', userRouter)
router.use('/productComments', productComments)
router.use('/newsComments', newsComments)


module.exports = router
