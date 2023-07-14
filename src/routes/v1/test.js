const express = require('express');
const router = express.Router();
const {AuthMiddleware} = require("../../middleware/")
const {TestController} = require("../../controller")

router.get('/',AuthMiddleware.checkAuth ,TestController.info)

module.exports = router;