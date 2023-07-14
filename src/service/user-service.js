const {UserRepository} = require('../repository');
const { AppError } = require("../utils/error");
const { StatusCodes } = require("http-status-codes");
const {Auth} = require("../utils/common/");
const bcrypt = require("bcrypt");
const user = new UserRepository();

async function createUser(data) {
    try {
        const response = await user.create(data);
        return response;
      } catch (error) {
        console.log(error);
        if (error.name == "SequelizeUniqueConstraintError") {
          let explanation = [];
          error.errors.forEach((err) => {
            explanation.push(err.message);
          });

          let msg = ""
          if(explanation[0] == "email must be unique")
          {
             msg = "Email already exists"
             throw new AppError(msg, StatusCodes.BAD_REQUEST);
          }
          throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        if (error.name == "SequelizeValidationError") {
          let explanation = [];
          error.errors.forEach((err) => {
            explanation.push(err.message);
          });
          if(explanation[0] == "Validation len on password failed")
          {
             msg = "Password length must be greater than or equal to 5"
             throw new AppError(msg, StatusCodes.BAD_REQUEST);
          }
          throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError(
          "Cannot create a new user",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
}

async function signinUser(data) {
    try {
        const user_exists = await user.getUserByemail(data.email);
        if(!user_exists) {
            throw new AppError("Email does not exist", StatusCodes.NOT_FOUND)
        }
        const password_check = Auth.checkPassword(data.password,user_exists.password);
        if(!password_check) {
            throw new AppError("Password doesnt match", StatusCodes.BAD_REQUEST);
        }
        const jwt = Auth.createToken({id : user_exists.id , email : user_exists.email})
        console.log(jwt)
        return jwt;
      } catch (error) {
        console.log(error);
        if( error instanceof AppError)
        {
            throw error;
        }
        throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
      }
}

async function isAuthenticated(token) {
    try {
        if(!token) {
            throw new AppError('Missing JWT token', StatusCodes.BAD_REQUEST);
        }
        const response = Auth.verifyToken(token);
        const user_details = await user.getByPk(response.id);
        if(!user_details) {
            throw new AppError('No user found', StatusCodes.NOT_FOUND);
        }
        return user_details.id;
    } catch(error) {
        if(error instanceof AppError) throw error;
        if(error.name == 'JsonWebTokenError') {
            throw new AppError('Invalid JWT token', StatusCodes.BAD_REQUEST);
        }
        if(error.name == 'TokenExpiredError') {
            throw new AppError('JWT token expired', StatusCodes.BAD_REQUEST);
        }
        console.log(error);
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createUser,
    signinUser,
    isAuthenticated
  };