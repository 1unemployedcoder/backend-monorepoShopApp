const Router = require('express')
const router = new Router()
const productsController = require('../controllers/productsController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', productsController.getAll)
router.get('/:id', productsController.getOne)
router.post('/', checkRole('ADMIN'), productsController.create)
router.delete('/:id', checkRole('ADMIN'), productsController.deleteOne)


module.exports = router
