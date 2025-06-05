const queries = require('./queries');
const {Sequelize} = require('sequelize');

class PostgesModule{
    sequelize;
    models;

    constructor(sequelize, models){
        this.sequelize = sequelize;
        this.models = models;
    }

    async searchProduct(searchValue, page = 1, limit = 9){
        let where = {};
    
        if(searchValue){
            where = {
                name: {
                    [Sequelize.Op.iLike]: `%${searchValue}%`,
                } 
            };
        }

        const productsData = await this.models.Product.findAndCountAll({
            limit,
            page,
            where: where,
            include: [{
                association: 'saler',
                attributes: ['id', 'name', 'rating']
            }],
        });

        return {
            count: productsData.count,
            rows: productsData.rows.map((product, index) => {
                return {
                    id: product.uuid,
                    name: product.name,
                    price: product.price,
                    rating: product.rating,
                    description: product.description,
                    img: product.img,
                    salerId: product.saler.id,
                    salerName: product.saler.name,
                    salerRating: product.saler.rating
                }
            })
        };
    }

    async getFilteredProducts(productTypeId, filterValueMap, page = 1, limit = 9) {           
        let filterCodes = '', filterValues = '';

        for(let filter of filterValueMap.entries().toArray()){
            if(filterCodes !== '') filterCodes += ';';
            if(filterValues !== '') filterValues += ';';

            filterCodes += filter[0];
            filterValues += filter[1];
        }

        let result;

        if(filterCodes != ''){
            const productsData = await this.sequelize.query(queries.filter_getProductsQuery,{
                replacements: { 
                    productTypeId, 
                    codes: filterCodes, 
                    values: filterValues, 
                    limit: limit, 
                    offset: (page - 1) * limit
                }
            });

            const productsCount = await this.sequelize.query(queries.filter_getProductsCountQuery,{
                replacements: { 
                    productTypeId, 
                    codes: filterCodes, 
                    values: filterValues, 
                }
            });

            let count = productsCount[0]?.[0]?.count;
            count = count ? Number(count) : 0;

            result = {
                count: count,
                rows: productsData[0]
            };
        }else{
            result = await this.models.Product.findAndCountAll({
                limit,
                page,
                include: [{
                    association: 'product_type',
                    attributes: [],
                    where: {
                        id: productTypeId
                    }
                },{
                    association: 'saler',
                    attributes: ['id', 'name', 'rating']
                }]
            });

            result = {
                count: result.count,
                rows: result.rows.map((product, index) => {
                    return {
                        id: product.uuid,
                        name: product.name,
                        price: product.price,
                        rating: product.rating,
                        description: product.description,
                        img: product.img,
                        salerId: product.saler.id,
                        salerName: product.saler.name,
                        salerRating: product.saler.rating
                    }
                })
            }
        }

        return result;
    }
}

module.exports = PostgesModule;