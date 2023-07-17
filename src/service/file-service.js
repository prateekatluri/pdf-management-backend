const {FileRepository,UserRepository} = require('../repository');
const { AppError } = require("../utils/error");
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require('uuid');
const {ServerConfig} = require("../config")
const FileRep = new FileRepository()
const UserRep = new UserRepository()
//GCP config
const { Storage } = require('@google-cloud/storage');
const { response } = require('express');
const gcs = new Storage({
  projectId: 'pdf-project-392114',
  keyFilename: 'src/config/key.json'
});
const bucket = gcs.bucket(ServerConfig.GCP_BUCKET_NAME);

async function uploadFile(data) {
    try {
        const pdfFile = data.file.filename;
        const uniqueFileName = `${uuidv4()}_${pdfFile.name}`;
        const blob = bucket.file(uniqueFileName);
        const stream = blob.createWriteStream({
          metadata: {
            contentType: 'application/pdf',
          },
        });
        stream.on('error', (err) => {
          console.error(err);
          return res.status(500).json({ error: 'Failed to upload PDF file' });
        });
        stream.on('finish', () => {
          const fileUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          FileRep.create({userId:data.userId,filename:pdfFile.name,path:fileUrl,uniqueName:uniqueFileName})
          return;
        });
        stream.end(pdfFile.data);
      } catch (error) {
        console.log(error);
          if( error instanceof AppError) throw error
          throw new AppError("some error occured", StatusCodes.INTERNAL_SERVER_ERROR);
      }
}

async function getFiles(data) {
  try {
      const userId = data.userId;
      console.log(userId);
      const response = await FileRep.getUserFiles({where:{
        userId: userId,
      }})
      const sharedFiles = await FileRep.getAllSharedFiles(userId);
      sharedFiles.map(file => file.dataValues.isShared = true)
      console.log(sharedFiles)
      const allFiles = [...response, ...sharedFiles];
      const updatedFiles = await Promise.all(
        allFiles.map(async (file) => {
          const uniqueName = file.uniqueName;
          const fileRef = bucket.file(uniqueName);
          const [exists] = await fileRef.exists();
          if (!exists) {
            throw new AppError('File with that name does not exist', StatusCodes.BAD_REQUEST);
          }
  
          const signedUrlConfig = {
            action: 'read',
            expires: Date.now() + 60 * 60 * 1000,
          };
  
          const signedUrl = await fileRef.getSignedUrl(signedUrlConfig);
  
          file.sharedLink = signedUrl[0];
          await file.save();
  
          return file;
        }))
      return updatedFiles
    } catch (error) {
      console.log(error);
        if( error instanceof AppError) throw error
        throw new AppError("some error occured", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function downloadFile(data) {
  try {
    const userId = data.userId;
    const uniqueName = data.uniqueName;
    const file = bucket.file(uniqueName);
    const [exist] = await file.exists();
    if(!exist) throw new AppError("File with that name does not exist", StatusCodes.BAD_REQUEST);
    const signedUrlConfig = {
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000, // Set the expiration time for the URL (15 minutes in this example)
    };

    const signedUrl =  await file.getSignedUrl(signedUrlConfig);

    return signedUrl;
  } catch (error) {
    console.log(error);
      if( error instanceof AppError) throw error
      throw new AppError("some error occured", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function shareFile(data) {
  try {
    const userId = data.userId;
    const otherEmail = data.email;
    const fileId = data.fileId;
    const user = await UserRep.getUserByemail(otherEmail)
    if(!user) {
      throw new AppError("Shared user does not exist",StatusCodes.BAD_REQUEST)
    }
    const file = await FileRep.getByPk(fileId);
    if(!file) {
      throw new AppError("Shared file doesnt exist",StatusCodes.BAD_REQUEST)
    }

    const sharedWith = file.sharedWith ? JSON.parse(file.sharedWith) : [];
    if (!sharedWith.includes(user.id)) {
      const user_string = "@"+user.id+"@";
      sharedWith.push(user_string);
      file.sharedWith = JSON.stringify(sharedWith)
    }
    await file.save()
    return file;
  } catch (error) {
    console.log(error);
      if( error instanceof AppError) throw error
      throw new AppError("some error occured", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
   uploadFile,
   getFiles,
   downloadFile,
   shareFile
  };