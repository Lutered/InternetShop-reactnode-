const bcrypt = require('bcrypt')

class hashHelper {
    constructor() {
        this.saltRounds = 5;
    }

    async hashPassword(password){
        const hashPassword = await bcrypt.hash(password, this.saltRounds);
        return hashPassword;
    }

    hashPasswordSync(password){
        const hashPassword = bcrypt.hashSync(password, this.saltRounds);
        return hashPassword;
    }

    compareSync(value1, value2){
        return bcrypt.compareSync(value1, value2);
    }
};

module.exports = new hashHelper();