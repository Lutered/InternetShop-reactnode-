const sequelize = require('./database');
const uuid = require('uuid');
const authTokenHelper = require('../helpers/AuthTokenHelper');
const initDatabaseData = require('../static/debug/initDatabaseData.json');

const fillDebugDataFn = async (dbModel, dataArray, config) => {
    let dbCount = await dbModel.count();;

    if(dbCount !== 0) return;

    let order = 1;
    for(let debugObj of dataArray){
        let insertObj = {...debugObj};

        if(config?.withOrder){
            insertObj.order = order;
            order++;
        }

        if(config?.uuid){
            insertObj.uuid = uuid.v4();
        }

        await dbModel.create(insertObj);
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

        await fillDebugDataFn(models.ProductType, initDatabaseData.types, { withOrder: true });
        await fillDebugDataFn(models.ProductCategory, initDatabaseData.categories, { uuid: true });
        await fillDebugDataFn(models.Saler, initDatabaseData.salers);
        await fillDebugDataFn(models.Product, initDatabaseData.products, { uuid: true });
        await fillDebugDataFn(models.FilterItem, initDatabaseData.filterItems, { withOrder: true });
        await fillDebugDataFn(models.ProductCharGroup, initDatabaseData.productCharGroup, { withOrder: true });
        await fillDebugDataFn(models.ProductCharItem, initDatabaseData.productCharItems, { withOrder: true });
        await fillDebugDataFn(models.CharValue, initDatabaseData.charValues);
        await fillDebugDataFn(models.FilterOption, initDatabaseData.filterOptionItems);
    }
};