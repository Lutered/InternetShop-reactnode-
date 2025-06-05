const authTokenHelper = require('../helpers/AuthTokenHelper');

module.exports = function (req, res, next) {
   let token = req.headers["authorization"];
   let userDetails;

   req.user = {
        isUserAuth: false,
        userDetails: {}
   };

   if(token){ 
        try{
            token = token.replace('Bearer ', '');

            userDetails = authTokenHelper.verifyJwt(token);
            req.user = {
                isUserAuth: true,
                userDetails
            };
        }catch{
            return res.status(403).json({message: 'Invalid token'});
        } 
   }

   next();
}
