const {Type} = require('../models/models')
const ApiError = require('../error/ApiError')
class TypeController {
    async create(req, res) {
        const {name, type} = req.body
        const typeCreate = await Type.create({name, type})
        return res.json(typeCreate)
    }
    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }
}

module.exports = new TypeController()
