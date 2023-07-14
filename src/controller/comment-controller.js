const {CommentService} = require("../service")
const {errorResponse,successResponse}= require("../utils/common")
const { StatusCodes } = require("http-status-codes");

async function getComments(req,res){
    try {
        const fileId = req.params.fileId
        const data = await CommentService.getComments({
            userId: req.user,
            fileId:fileId,
        });
        successResponse.data = data;
        successResponse.message = "successfully fetched comments";
        return res.status(StatusCodes.CREATED).json(successResponse);
      } catch (error) {
        errorResponse.error = error;
        return res.status(error.statuscode).json(errorResponse);
      }
}

async function addComment(req,res){
    try {
        const fileId = req.params.fileId
        const content = req.params.content
        const data = await CommentService.addComment({
            userId: req.user,
            fileId:fileId,
            content:content
        });
        successResponse.data = data;
        successResponse.message = "successfully added comment";
        return res.status(StatusCodes.CREATED).json(successResponse);
      } catch (error) {
        errorResponse.error = error;
        return res.status(error.statuscode).json(errorResponse);
      }
}


module.exports = {
    getComments,
    addComment
}