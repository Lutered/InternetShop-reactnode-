const sequelize = require('./database');
const authTokenHelper = require('../helpers/AuthTokenHelper');
const initDatabaseData = require('../static/debug/initDatabaseData.json');

const fillDebugDataFn = async (dbModel, dataArray, withOrder = false) => {
    let dbCount = await dbModel.count();;

    if(dbCount !== 0) return;

    let order = 1;
    for(let debugObj of dataArray){
        if(withOrder){
            await dbModel.create({...debugObj, order: order});
            order++;
        }else{
            await dbModel.create(debugObj);
        }
    }
};

module.exports = async (models) => {
    const debug = process.env.RUNTIMEMODE === 'DEBUG';
    const dbInitMode = process.env.DB_INIT_MODE || 'CREATE';

    await sequelize.authenticate();

    if(debug && ['DROPALLWAYS_INIT', 'DROPALLWAYS'].includes(dbInitMode)){
        await sequelize.drop({
            cascade: true
        });
    }

    await sequelize.sync();

    const masterAdminPasswordHash = 
        await authTokenHelper.hashPassword(process.env.MASTER_ADMIN_PASS);

    //Create master admin user allways
    models.User.findOrCreate({
        where: {
            name: 'MASTER_ADMIN'
        },
        defaults: { 
            name: 'MASTER_ADMIN',
            email: 'master@master.com',
            password: masterAdminPasswordHash,
            role: 'MASTER_ADMIN'
        }
    });

    if(await models.CharItemTypes.count() === 0){
        models.CharItemTypes.bulkCreate([
            {code: "option" },
            {code: "string" },
            {code: "number" },
            {code: "date" }
        ]);
    }

     //Generate debug data
    if(debug && ['INIT', 'DROPALLWAYS_INIT'].includes(dbInitMode)){    
        //Create default user
        const olegPasswordHash =  await authTokenHelper.hashPassword('123');
        models.User.findOrCreate({
            where: {
                name: 'Oleg'
            },
            defaults: { 
                name: 'Oleg',
                email: 'oleg@test.com',
                password: olegPasswordHash
            }
        });

        await fillDebugDataFn(models.ProductType, initDatabaseData.types, true);
        await fillDebugDataFn(models.ProductCategory, initDatabaseData.categories, false);
        await fillDebugDataFn(models.Brand, initDatabaseData.brands, false);
        await fillDebugDataFn(models.Saler, initDatabaseData.salers, false);
        await fillDebugDataFn(models.Product, initDatabaseData.products, false);
        await fillDebugDataFn(models.FilterItem, initDatabaseData.filterItems, true);
        await fillDebugDataFn(models.ProductCharGroup, initDatabaseData.productCharGroup, true);
        await fillDebugDataFn(models.ProductCharItem, initDatabaseData.productCharItems, true);
        await fillDebugDataFn(models.CharNumberValue, initDatabaseData.charNumberValues, false);
        await fillDebugDataFn(models.CharStringValue, initDatabaseData.charTextValues, false);
        await fillDebugDataFn(models.FilterOptions, initDatabaseData.filterOptionItems, false);
    }
};