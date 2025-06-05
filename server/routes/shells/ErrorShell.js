const { responseWithError }= require('../../helpers/ErrorHelper');

errorShell = (execFunc) => {
    return async (req, res, next) => {
        try{
            await execFunc(req, res, next);
        }
        catch(e){
            console.error(e);
            return responseWithError(res, 500, 'Unexpected error');
        }
    }
};

module.exports = errorShell;