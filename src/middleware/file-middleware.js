const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const {AppError} = require('../utils/error');

async function checkFileType(req, res, next) {
    try {
        const filetype = req.files.filename.name;
        if(filetype.split('.')[1] != "pdf") throw new AppError("File type must be pdf",StatusCodes.BAD_REQUEST)
        next();
    } catch(error) {
        return res
                .status(error.statuscode)
                .json(error);
    }
    
}



module.exports = {
    checkFileType,
}