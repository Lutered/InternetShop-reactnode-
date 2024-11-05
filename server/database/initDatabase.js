const sequelize = require('./database');
const hashHelper = require('../helpers/hashHelper');

module.exports = async (models) => {
   // process.env.USER_PASS_ROUND;
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

    //clear data
    await models.ProductType.destroyAll();
    await models.Brand.destroyAll();
    await models.Brand.destroyAll();

    //Data for testing and debugging
    const productTypeCount = await models.ProductType.count();

    if(productTypeCount === 0){
        const typesDefaultArray = [
            {id: 1, name: 'Телефоны'},
            {id: 2, name: 'Компютеры'},
            {id: 3, name: 'Пылесосы'},
            {id: 4, name: 'Кондиционеры'}
        ];

        let order = 1;
        for(let type of typesDefaultArray){
            await models.ProductType.create({
                id: type.id,
                name: type.name,
                order: order
            });
            order++;
        }
    }

    const brandCount = await models.Brand.count();

    if(brandCount === 0){
        const brandDefaultArray = [
            {id: 1, name: 'Default'},
        ];

        for(let brand of brandDefaultArray){
            await models.Brand.create(brand);
        }
    } 

    const productCount = await models.Product.count();

    if(productCount === 0){
        const productDefaultArray = [
            {id: 1, name: 'Phone1', price: 15, img: 'phone1.jpg', description: 'description', rating: 0, productTypeId: 1, brandId: 1},
            {id: 2, name: 'Phone2', price: 19, img: 'phone2.jpg', description: 'description', rating: 0, productTypeId: 1, brandId: 1},
            {id: 3, name: 'Laptop1', price: 31, img: 'laptop1.jpg', description: 'description', rating: 0, productTypeId: 2, brandId: 1},
            {id: 4, name: 'Laptop2', price: 54, img: 'laptop2.jpg', description: 'description', rating: 0, productTypeId: 2, brandId: 1},
            {id: 5, name: 'VacuumCleaner1', price: 20, img: 'vacuumcleaner1.jpg', description: 'description', rating: 0, productTypeId: 3, brandId: 1},
            {id: 6, name: 'VacuumCleaner2', price: 96.7, img: 'vacuumcleaner2.jpg', description: 'description', rating: 0, productTypeId: 3, brandId: 1},
            {id: 7, name: 'Air Conditioner', price: 46, img: 'airсonditioner1.jpg', description: 'description', rating: 0, productTypeId: 4, brandId: 1},
        ];

        for(let product of productDefaultArray){
            await models.Product.create(product);
        }
    }


};