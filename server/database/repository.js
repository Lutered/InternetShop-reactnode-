const sequelize = require('./database');
const PostgresModule = require('./specDbModules/postgres/module.js');

const models = require('./models/models.js');
const initDatabaseData = require('./initDatabase.js');

class Repository{
    specDbModule;
    models = models;
    sequelize = sequelize;

    constructor(){
        this.specDbModule = new PostgresModule(sequelize, models);
    }

    async init(){
        await initDatabaseData(this.models);
    }

    async getFilteredProducts(){
        return await this.specDbModule.getFilteredProducts(...arguments);
    }

    async searchProducts(){
        return await this.specDbModule.searchProduct(...arguments);
    }
}

module.exports = new Repository();