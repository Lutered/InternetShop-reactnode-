const sequelize = require('./database');
const hashHelper = require('../helpers/hashHelper');
const initDatabaseData = require('../static/debug/initDatabaseData.json');

//const initDatabaseData = {};

module.exports = async (models) => {
    const debug = process.env.RUNTIMEMODE === 'DEBUG';
    const dbInitMode = process.env.DB_INIT_MODE || 'CREATE';

    await sequelize.authenticate();

    if(debug && ['DROPALLWAYS_INIT', 'DROPALLWAYS'].includes(dbInitMode)){
        await sequelize.drop();
    }

    await sequelize.sync();

    //Create master admin user allways
    models.User.findOrCreate({
        where: {
            name: 'MASTER_ADMIN'
        },
        defaults: { 
            name: 'MASTER_ADMIN',
            password: hashHelper.hashPasswordSync(process.env.MASTER_ADMIN_PASS),
            role: 'MASTER_ADMIN'
        }
    });

     //Generate debug data
    if(debug && ['INIT', 'DROPALLWAYS_INIT'].includes(dbInitMode)){
        let order = 1;

        const productTypeCount = await models.ProductType?.count();

        if(productTypeCount === 0){
            for(let type of initDatabaseData.types){
                await models.ProductType.create({
                    ...type //,
                    //order: order
                });
                //order++;
            }
        }

        const productCategoryCount = await models.ProductCategory.count();

        if(productCategoryCount === 0){
            order = 1;
            for(let category of initDatabaseData.categories){
                await models.ProductCategory.create({
                    ...category
                });
            }
        }

        const brandCount = await models.Brand.count();

        if(brandCount === 0){
            for(let brand of initDatabaseData.brands){
                await models.Brand.create(brand);
            }
        } 

        const productCount = await models.Product.count();

        if(productCount === 0){
            for(let product of initDatabaseData.products){
                await models.Product.create(product);
            }
        }
    }
};