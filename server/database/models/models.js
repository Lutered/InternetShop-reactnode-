const sequelize = require('../database');
const {DataTypes} = require('sequelize');

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    uuid: {type: DataTypes.UUID, unique: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.DECIMAL, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: true},
    description: {type: DataTypes.TEXT},
    rating: {type: DataTypes.DOUBLE, defaultValue: 0}
});

const ProductType = sequelize.define('product_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    code: {type:  DataTypes.STRING, unique: true, allowNull: false},
    icon: {type: DataTypes.STRING, unique: false, allowNull: true},
    order: {type: DataTypes.INTEGER}
});

const ProductCategory = sequelize.define('product_category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    uuid: {type: DataTypes.UUID, unique: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: true},
    popularity: {type: DataTypes.DOUBLE},
    filter: {type: DataTypes.JSON}
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
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
});

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    uuid: {type: DataTypes.UUID, unique: true}
});

const BasketProduct = sequelize.define('basket_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count: {type: DataTypes.INTEGER},
});

User.hasOne(Basket);
Basket.belongsTo(User);

ProductType.hasMany(Product);
Product.belongsTo(ProductType);

ProductType.hasMany(ProductCategory);
ProductCategory.belongsTo(ProductType);

Saler.hasMany(Product);
Product.belongsTo(Saler);

Product.hasMany(Comment);
Comment.belongsTo(Product);

Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);

Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);

//Filter
const ProductCharGroup = sequelize.define('product_char_group', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    label: {type: DataTypes.STRING},
    order: {type: DataTypes.INTEGER}
});

const ProductCharItem = sequelize.define('product_char_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    label: {type: DataTypes.STRING},
    order: {type: DataTypes.INTEGER},
    suffix: {type: DataTypes.STRING}
});

const CharItemTypes = sequelize.define('char_item_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    code: {type: DataTypes.STRING}
});

const CharValue = sequelize.define('char_value', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    textValue: {type: DataTypes.STRING},
    numValue: {type: DataTypes.DOUBLE},
    dateValue: {type: DataTypes.DATE}
});

const FilterItem = sequelize.define('filter_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    label: {type: DataTypes.STRING},
    code: {type: DataTypes.STRING},
    order: {type: DataTypes.INTEGER},
    props: {type: DataTypes.JSON}
});

const FilterOption = sequelize.define('filter_option_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    label: {type: DataTypes.STRING},
    code: {type: DataTypes.STRING}
});

ProductType.hasMany(ProductCharGroup);
ProductCharGroup.belongsTo(ProductType);

ProductType.hasMany(ProductCharItem);
ProductCharItem.belongsTo(ProductType);

ProductCharGroup.hasMany(ProductCharItem);
ProductCharItem.belongsTo(ProductCharGroup);

ProductCharItem.belongsTo(CharItemTypes);
ProductCharItem.belongsTo(FilterItem);

ProductCharItem.hasMany(CharValue);
CharValue.belongsTo(ProductCharItem);

Product.hasMany(CharValue);
CharValue.belongsTo(Product);

ProductType.hasMany(FilterItem);
FilterItem.belongsTo(ProductType);

FilterItem.belongsTo(CharItemTypes);
FilterOption.belongsTo(FilterItem);

module.exports = {
    Product,
    ProductType,
    ProductCategory,
    Saler,
    Comment, 
    User,
    Basket,
    BasketProduct,
    ProductCharGroup,
    ProductCharItem,
    CharItemTypes,
    CharValue,
    FilterItem,
    FilterOption
}
