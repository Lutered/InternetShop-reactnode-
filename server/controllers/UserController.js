const ApiError = require('../error/ApiError');
const {User, Basket} = require('../database/models/models');
const hashHelper = require('../helpers/hashHelper');
const jwt = require('jsonwebtoken');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController{
    async registration(req, res, next){
        const {email, password} = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }

        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const hashPassword = await hashHelper.hashPassword(password);
        const user = await User.create({email, password: hashPassword});
        const basket = await Basket.create({userId: user.id});
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
}

module.exports = new UserController();