const responseWithError = (resp, status, message) => {
    return resp.status(status).json({message});
};

module.exports = {
    responseWithError
};