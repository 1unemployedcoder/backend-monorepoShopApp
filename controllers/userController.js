const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const {User} = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJwt = (id, name, role) => {
    return jwt.sign(
        {id, name, role},
        process.env.SECRET_KEY,
        {
            expiresIn: '24h'
        }
    )
}

class UserController {
    async registration(req, res, next) {
        const {name, password, role} = req.body
        if (!name || !password) {
            return next(ApiError.badRequest('Enter name and password!'))
        }
        const candidate = await User.findOne({where: {name}})
        if (candidate) {
            return next(ApiError.badRequest('User with that name already created'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({name, password: hashPassword, role})
        const token = generateJwt(user.id, name, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {name, password} = req.body
        const user = await User.findOne({where: {name}})
        if (!user) {
            return next(ApiError.forbidden('User not found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.forbidden('Password not true'))
        }
        const token = generateJwt(user.id, user.name, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.name, req.user.role)
        return res.json({token})
    }

}

module.exports = new UserController()
