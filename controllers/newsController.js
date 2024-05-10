const {News, NewsComments, User} = require("../models/models");
const ApiError = require("../error/ApiError");

class NewsController {
    async create(req, res, next) {
        try {
            const {title, description, img, date} = req.body
            const userId = req.userId
            const neww = await News.create({title, description, img, date, userId})
            return res.json(neww)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 5
        let offset = page * limit - limit
        const news = await News.findAndCountAll({limit, offset, include: [{
                model: User,
                attributes: ['name']
            }]})
        return res.json(news)
    }

    async getOne(req, res) {
        const {id} = req.params
        const news = await News.findOne({
            where: {id},
            include: [{
                model: User,
                attributes: ['name']
            }, {model: NewsComments, as: 'newsComments', include: [{ model: User, attributes: ['name'] }]}]
        })
        return res.json(news)
    }

    async delete(req, res) {
        const {id} = req.params
        const delNews = await News.destroy({where: {id}})
        return res.status(200).json(`Delete news with id=${id} successfully`)
    }
}

module.exports = new NewsController()
