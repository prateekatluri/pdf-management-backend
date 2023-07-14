const express = require("express");
const router = express.Router();
const userRouter = require("./user-route");
const testRouter = require("./test");
const fileRouter = require("./file-route");
const commentRouter = require("./comment-route");

router.use('/user',userRouter)
router.use('/file',fileRouter)
router.use('/comment',commentRouter)
//dummy route to test
router.use('/test',testRouter)

module.exports = router;