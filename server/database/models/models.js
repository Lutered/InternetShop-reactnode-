const sequelize = require('../database');
const {DataTypes} = require('sequelize');

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.DECIMAL, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING},
    rating: {type: DataTypes.DOUBLE, defaultValue: 0}
});

const ProductType = sequelize.define('product_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    order: {type: DataTypes.INTEGER},
    popularity: {type: DataTypes.DOUBLE}
});

const ProductSubType = sequelize.define('product_subtype', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    order: {type: DataTypes.INTEGER},
    popularity: {type: DataTypes.DOUBLE}
});

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
});

const Saler = sequelize.define('saler', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    rating: {type: DataTypes.DOUBLE}
});

const Comment = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING}
});

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
});

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const BasketProduct = sequelize.define('basket_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});


const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});


User.hasOne(Basket);
Basket.belongsTo(User);

ProductType.hasMany(ProductType);
Product.belongsTo(ProductType);

Brand.hasMany(Product);
Product.belongsTo(Brand);

ProductType.hasMany(ProductSubType);
ProductSubType.belongsTo(ProductType);

Saler.hasMany(Product);
Product.belongsTo(Saler);

Product.hasMany(Comment);
Comment.belongsTo(Product);

Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);

ProductType.belongsToMany(Brand, {through: TypeBrand });
Brand.belongsToMany(ProductType, {through: TypeBrand });

module.exports = {
    Product,
    ProductType,
    ProductSubType,
    Brand,
    Saler,
    Comment, 
    User,
    Basket,
    BasketProduct
}
