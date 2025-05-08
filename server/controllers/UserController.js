class UserController{
    async test(req, res, next){
        return res.json({"Test": "1"});
    }
}

module.exports = new UserController();