const Router = require('express')
const router = new Router()
const newsController = require('../controllers/newsController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authInterceptor = require('../middleware/AuthInterceptorMiddleware')

router.get('/', newsController.getAll)
router.get('/:id', newsController.getOne)
router.post('/', authInterceptor, checkRole('ADMIN'), newsController.create)
router.delete('/:id', checkRole('ADMIN'), newsController.delete)

module.exports = router
