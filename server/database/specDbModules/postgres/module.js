const queries = require('./queries');
const {Sequelize} = require('sequelize');

class PostgesModule{
    sequelize;
    models;

    constructor(sequelize, models){
        this.sequelize = sequelize;
        this.models = models;

       // sequelize.query(queries.createFilterFn);
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
            where: where
        });

        return productsData;
    }

    async getFilteredProducts(productType, filterValueMap, page = 1, limit = 9) {   
        const productTypeId = this.models.ProductType.findOne({
            attributes: ['id'],
            code: productType
        });
        
        if(!productTypeId) 
            throw `Product type with code ${productType} was not found`;
        
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
                    productType, 
                    codes: filterCodes, 
                    values: filterValues, 
                    limit: limit, 
                    offset: (page - 1) * limit
                }
            });

            const productsCount = await this.sequelize.query(queries.filter_getProductsCountQuery,{
                replacements: { 
                    productType, 
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
                        code: productType
                    }
                }]
            });
        }

        return result;
    }
}

module.exports = PostgesModule;