const ApiError = require('../error/ApiError');
const authTokenHelper = require('../helpers/AuthTokenHelper');
const repository = require('../database/repository');
const {User} = repository.models;

class AuthController{
    async registration(req, res, next){
        const {name, email, password} = req.body;

        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }

        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
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
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }

        const user = await User.findOne({where: {email}});
        if(!user){
            return next(ApiError.badRequest('Неверный email или пароль'));
        }

        if(!await authTokenHelper.comparePassword(password, user.password)){
            return next(ApiError.badRequest('Неверный email или пароль'));
        }

        const token = authTokenHelper.generateJwtSync(user);
        return res.json({token});
    }
}

module.exports = new AuthController();