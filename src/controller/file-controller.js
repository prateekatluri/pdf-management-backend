const {FileService} = require("../service")
const {errorResponse,successResponse}= require("../utils/common")
const { StatusCodes } = require("http-status-codes");

async function uploadFile(req,res){
    try {
        // console.log(req.user)
        const response = await FileService.uploadFile({
          file:req.files,
          userId:req.user
        });
        // successResponse.data = data;
        successResponse.message = "successfully uploaded file";
        return res.status(StatusCodes.OK).json(successResponse);
      } catch (error) {
        console.log(error);
        errorResponse.error = error;
        return res.status(500).json(errorResponse);
      }
}

async function getFiles(req,res){
  try {
      // console.log(req.user)
      const response = await FileService.getFiles({
        userId:req.user
      });
      successResponse.data = response;
      successResponse.message = "successfully fetched all files";
      return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
      console.log(error);
      errorResponse.error = error;
      return res.status(500).json(errorResponse);
    }
}

async function downloadFile(req,res){
  try {
      const uniqueName = req.params.uniqueName
      const response = await FileService.downloadFile({
        uniqueName:uniqueName,
        userId:req.user
      });
      successResponse.data = response;
      successResponse.message = "successfully downloaded file";
      return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
      console.log(error);
      errorResponse.error = error;
      return res.status(500).json(errorResponse);
    }
}

async function getFile(req,res){
  try {
      // console.log(req.user)
      const response = await FileService.uploadFile({
        file:req.files,
        userId:req.user
      });
      // successResponse.data = data;
      successResponse.message = "successfully uploaded file";
      return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
      console.log(error);
      errorResponse.error = error;
      return res.status(500).json(errorResponse);
    }
}

async function shareFile(req,res){
    try {
      const otherEmail = req.params.email
      const fileId = req.params.fileId
      const data = await FileService.shareFile({
          email: otherEmail,
          userId: req.user,
          fileId:fileId,
        });
        successResponse.data = data;
        successResponse.message = "successfully shared the file";
        return res.status(StatusCodes.CREATED).json(successResponse);
      } catch (error) {
        errorResponse.error = error;
        return res.status(error.statuscode).json(errorResponse);
      }
}


module.exports = {
    uploadFile,
    shareFile,
    getFiles,
    getFile,
    downloadFile
}