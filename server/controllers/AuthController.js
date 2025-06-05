const authTokenHelper = require('../helpers/AuthTokenHelper');
const { responseWithError }= require('../helpers/ErrorHelper');
const repository = require('../database/repository');
const {User} = repository.models;

class AuthController{
    async registration(req, res, next){
        const {name, email, password} = req.body;

        if (!email || !password) {
            return responseWithError(res, 400, 'Wrong email or password');
        }

        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return responseWithError(res, 400, 'User with such email already exists');
        }

        const userName = name ?? email;

        const hashPassword = await authTokenHelper.hashPassword(password);
        const user = await User.create({name: userName, email, password: hashPassword});
        const token = authTokenHelper.generateJwtSync(user);
        return res.json({token});
    }

    async login(req, res, next){
        const {email, password} = req.body;
        if (!email || !password) {
            return responseWithError(res, 400, 'Wrong input parameters');
        }

        const user = await User.findOne({where: {email}});
        if(!user){
            return responseWithError(res, 400, 'User with such email was not found');
        }

        if(!await authTokenHelper.comparePassword(password, user.password)){
            return responseWithError(res, 400, 'Wrong email or password');
        }

        const token = authTokenHelper.generateJwtSync(user);
        return res.json({token});
    }
}

module.exports = new AuthController();