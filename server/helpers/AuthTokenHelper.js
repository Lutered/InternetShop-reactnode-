const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

class AuthTokenHelper {
   static saltRounds = 5;
   static secret = process.env.SECRET_KEY;

    static async hashPassword(password){
        const hashPassword = await bcrypt.hash(password, this.saltRounds);
        return hashPassword;
    }

    static async comparePassword(password, passwordHash){
        return await bcrypt.compare(password, passwordHash);
    }

   static generateJwtSync(user){
        const payload = {
            id: user.id, 
            name: user.name, 
            email: user.email, 
            role:user.role
        };
        const secret = process.env.SECRET_KEY;
        const options = {expiresIn: '24h'};

        return jwt.sign(payload, secret, options);
    }

    static verifyJwt(token){
        return jwt.verify(token, AuthTokenHelper.secret);
    }
};

module.exports = AuthTokenHelper;