const {ProductComments, Products} = require('../models/models')
const ApiError = require('../error/ApiError')
class ProductsCommentsController {
    async create(req, res) {
        const {id} = req.params
        const {description, rate} = req.body
        const userId = req.userId
        const comment = await ProductComments.create({description, rate, productId: id, userId: userId})
        return res.json(comment)
    }

    async delete(req, res, next) {
        const {id} = req.params
        const userId = req.userId
        const role = req.role
        let comment
        if (role === 'ADMIN') {
            comment = await ProductComments.findOne({where: {id}});
        } else {
            comment = await ProductComments.findOne({where: {id, userId}});
        }
        if (comment.userId === userId || role === 'ADMIN') {
            await comment.destroy();
            return res.status(200).json(`Delete comment with id=${id} successfully`)
        } else {
            next(ApiError.badRequest('Not true request comment'))
        }
    }
}

module.exports = new ProductsCommentsController()
