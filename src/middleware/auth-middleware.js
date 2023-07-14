const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/error');
const { UserService } = require('../service');

async function checkAuth(req, res, next) {
    try {
        const response = await UserService.isAuthenticated(req.headers['x-access-token']);
        if(response) {
            req.user = response;
            next();
        }
    } catch(error) {
        return res
                .status(error.statuscode)
                .json(error);
    }
    
}



module.exports = {
    checkAuth,
}