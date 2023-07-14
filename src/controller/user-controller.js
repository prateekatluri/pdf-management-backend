const {UserService} = require("../service")
const {errorResponse,successResponse}= require("../utils/common")
const { StatusCodes } = require("http-status-codes");

async function createUser(req,res){
    try {
        const data = await UserService.createUser({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        successResponse.data = data;
        successResponse.message = "successfully created user";
        return res.status(StatusCodes.CREATED).json(successResponse);
      } catch (error) {
        errorResponse.error = error;
        return res.status(error.statuscode).json(errorResponse);
      }
}

async function signinUser(req,res){
    try {
        const data = await UserService.signinUser({
          email: req.body.email,
          password: req.body.password,
        });
        successResponse.data = data;
        successResponse.message = "successfully signed in user";
        return res.status(StatusCodes.CREATED).json(successResponse);
      } catch (error) {
        errorResponse.error = error;
        return res.status(error.statuscode).json(errorResponse);
      }
}

module.exports = {
    createUser,
    signinUser
}