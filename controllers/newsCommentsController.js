const {NewsComments} = require('../models/models')
const ApiError = require('../error/ApiError')
class NewsCommentsController {
    async create(req, res) {
        const {id} = req.params
        const {description} = req.body
        const userId = req.userId
        const comment = await NewsComments.create({description, newsId: id, userId})
        return res.json(comment)
    }

    async delete(req, res, next) {
        const {id} = req.params
        const userId = req.userId
        const role = req.role
        let comment
        if (role === 'ADMIN') {
            comment = await NewsComments.findOne({where: {id}});
        } else {
            comment = await NewsComments.findOne({where: {id, userId}});
        }
        if (comment.userId === userId || role === 'ADMIN') {
            await comment.destroy();
            return res.status(200).json(`Delete comment with id=${id} successfully`)
        } else {
            next(ApiError.badRequest('Not true request comment'))
        }
    }
}
module.exports = new NewsCommentsController()
