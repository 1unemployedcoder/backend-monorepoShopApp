const {User, Products, ProductInfo, ProductComments} = require('../models/models')
const ApiError = require('../error/ApiError')
const {Sequelize} = require("sequelize");
class ProductsController {
    async create(req, res, next) {
        try {
            let {name, description, img, price, typeId, info} = req.body
            const product = await Products.create({name, description, img, price, typeId})
            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                )
            }
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {typeId, limit, page, search, sortBy} = req.query
        page = page || 1
        limit = limit || 5
        let offset = page * limit - limit
        let whereClause = {};
        if (typeId) {
            whereClause.typeId = typeId;
        }
        if (search) {
            whereClause[Sequelize.Op.or] = [
                { name: { [Sequelize.Op.iLike]: `%${search}%` } },
                { description: { [Sequelize.Op.iLike]: `%${search}%` } }
            ];
        }

        let orderClause;
        if (sortBy === 'price_asc') {
            orderClause = [['price', 'ASC']];
        } else if (sortBy === 'price_desc') {
            orderClause = [['price', 'DESC']];
        } else {
            orderClause = [];
        }

        const products = await Products.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            order: orderClause
        });

        return res.json(products);
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Products.findOne({
                where: {id},
                include: [{model: ProductInfo, as: 'info'}, {model: ProductComments, as: 'productComments', include: [{ model: User, attributes: ['name'] }]}]
            })
        return res.json(product)
    }

    async deleteOne(req, res) {
        const {id} = req.params
        const product = await Products.destroy({where: {id}})
        return res.status(200).json(`Delete product with id=${id} successfully`)
    }
}

module.exports = new ProductsController()
