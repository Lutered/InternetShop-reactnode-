const authTokenHelper = require('../helpers/AuthTokenHelper');

module.exports = () => {
   return (req, res, next) => {
      const user = req.user;
      
      if(!user?.isUserAuth){
         return res.status(403).json({message: 'Unauthorized access'});
      }
      next();
   }
}
