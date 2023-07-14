const express = require('express');
const { FileController } = require('../../controller');
const {AuthMiddleware,FileMiddleware} = require("../../middleware/")
const router = express.Router();

router.post('/upload',AuthMiddleware.checkAuth,FileMiddleware.checkFileType,FileController.uploadFile);
router.get('/',AuthMiddleware.checkAuth,FileController.getFiles);
router.get('/download/:uniqueName',AuthMiddleware.checkAuth,FileController.downloadFile)
router.get('/share/:fileId/:email',AuthMiddleware.checkAuth,FileController.shareFile)
// router.post('/share',UserController.signinUser);




module.exports = router;