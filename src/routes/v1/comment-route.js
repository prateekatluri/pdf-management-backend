const express = require('express');
const { CommentController } = require('../../controller');
const {AuthMiddleware} = require('../../middleware')
const router = express.Router();

router.get('/:fileId',AuthMiddleware.checkAuth,CommentController.getComments);
router.post('/add/:fileId/:content',AuthMiddleware.checkAuth,CommentController.addComment);



module.exports = router;