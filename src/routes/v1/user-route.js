const express = require('express');
const { UserController } = require('../../controller');

const router = express.Router();

router.post('/signup',UserController.createUser);
router.post('/signin',UserController.signinUser);



module.exports = router;