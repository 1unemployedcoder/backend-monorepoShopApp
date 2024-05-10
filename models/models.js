const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
    name: {type: DataTypes.STRING, unique: true},
})

const Products = sequelize.define('products', {
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING, unique: true, allowNull: false},
    img: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const ProductInfo = sequelize.define('product_info', {
    title: {type: DataTypes.STRING, unique: true},
    description: {type: DataTypes.STRING, unique: true},
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const ProductComments = sequelize.define('product_comments', {
    description: {type: DataTypes.STRING, allowNull: false},
    rate: {type: DataTypes.INTEGER, defaultValue: 0},
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const News = sequelize.define('news', {
    title: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING, unique: true, allowNull: false},
    img: {type: DataTypes.STRING, unique: true, allowNull: false},
    date: {type: DataTypes.STRING, allowNull: false},
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const NewsComments = sequelize.define('news_comments', {
    description: {type: DataTypes.STRING, allowNull: false},
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Type = sequelize.define('type', {
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasMany(News, { onDelete: 'CASCADE' })
News.belongsTo(User)

User.hasMany(NewsComments, { onDelete: 'CASCADE' })
NewsComments.belongsTo(User)

User.hasMany(ProductComments, { onDelete: 'CASCADE' })
ProductComments.belongsTo(User)

News.hasMany(NewsComments, { onDelete: 'CASCADE', as: 'newsComments'})
NewsComments.belongsTo(News)

Type.hasMany(Products)
Products.belongsTo(Type)

Products.hasMany(ProductInfo, {as: 'info'})
ProductInfo.belongsTo(Products)

Products.hasMany(ProductComments, { onDelete: 'CASCADE', as: 'productComments' })
ProductComments.belongsTo(Products)

module.exports = {
    User, Products, ProductInfo, ProductComments, News, NewsComments, Type
}
