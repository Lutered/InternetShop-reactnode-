const ApiError = require('../../error/ApiError');

errorShell = (execFunc) => {
    return async (req, res, next) => {
        try{
            await execFunc(req, res, next);
        }
        catch(e){
            console.error(e);
            return res.status(500).json({message: 'Unexpected error'});
        }
    }
};

module.exports = errorShell;