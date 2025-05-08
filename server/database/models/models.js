const sequelize = require('../database');
const {DataTypes} = require('sequelize');

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.DECIMAL, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: true},
    description: {type: DataTypes.TEXT},
    rating: {type: DataTypes.DOUBLE, defaultValue: 0},
    productCharacteristic: {type: DataTypes.TEXT}
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
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    //filter: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, allowNull: true},
    popularity: {type: DataTypes.DOUBLE},
    filter: {type: DataTypes.JSON}
});

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    //popularity: {type: DataTypes.DOUBLE}
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
    count: {type: DataTypes.INTEGER},
});

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

User.hasOne(Basket);
Basket.belongsTo(User);

ProductType.hasMany(Product);
Product.belongsTo(ProductType);

Brand.hasMany(Product);
Product.belongsTo(Brand);

ProductType.hasMany(ProductCategory);
ProductCategory.belongsTo(ProductType);

ProductCategory.hasMany(Product, {constraints: false});
Product.belongsTo(ProductCategory, {constraints: false});

Saler.hasMany(Product);
Product.belongsTo(Saler);

Product.hasMany(Comment);
Comment.belongsTo(Product);

Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);

Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);

ProductType.belongsToMany(Brand, {through: TypeBrand });
Brand.belongsToMany(ProductType, {through: TypeBrand });

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
    valueId: {type: DataTypes.INTEGER, allowNull: false}
});

const CharItemTypes = sequelize.define('char_item_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    code: {type: DataTypes.STRING}
});

const CharNumberValue = sequelize.define('char_number_value', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.DOUBLE},
    suffix: {type: DataTypes.STRING}
});

const CharStringValue = sequelize.define('char_text_value', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING}
});

const CharDateItem = sequelize.define('char_date_value', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.DATE}
});

const FilterItem = sequelize.define('filter_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    label: {type: DataTypes.STRING},
    code: {type: DataTypes.STRING},
    order: {type: DataTypes.INTEGER},
    props: {type: DataTypes.JSON}
});

const FilterOptions = sequelize.define('filter_option_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    label: {type: DataTypes.STRING},
    code: {type: DataTypes.STRING}
});

Product.hasMany(ProductCharGroup);
ProductCharGroup.belongsTo(Product);

Product.hasMany(ProductCharItem);
ProductCharItem.belongsTo(Product);

ProductCharGroup.hasMany(ProductCharItem);
ProductCharItem.belongsTo(ProductCharGroup);

ProductCharItem.belongsTo(CharItemTypes);
ProductCharItem.belongsTo(FilterItem);

ProductType.hasMany(FilterItem);
FilterItem.belongsTo(ProductType);

FilterItem.belongsTo(CharItemTypes);
FilterOptions.belongsTo(FilterItem);

module.exports = {
    Product,
    ProductType,
    ProductCategory,
    Brand,
    Saler,
    Comment, 
    User,
    Basket,
    BasketProduct,
    ProductCharGroup,
    ProductCharItem,
    CharItemTypes,
    CharNumberValue,
    CharStringValue,
    CharDateItem,
    FilterItem,
    FilterOptions
}
