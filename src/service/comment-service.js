const {CommentRepository} = require('../repository');
const { AppError } = require("../utils/error");
const { StatusCodes } = require("http-status-codes");

const CommentRepo = new CommentRepository();

async function getComments(data) {
    try {
        console.log(data)
        const response = await CommentRepo.getAllComments(data);
        return response;
      } catch (error) {
        console.log(error);
        throw new AppError(
          "Cannot fetch comments",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
}

async function addComment(data) {
    try {
        const userId = data.userId;
        const fileId = data.fileId;
        const content = data.content;
        const response = await CommentRepo.create(data);
        return response;
      } catch (error) {
        console.log(error);
        throw new AppError(
          "Cannot add comment",
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
}

module.exports = {
    getComments,
    addComment,
  };