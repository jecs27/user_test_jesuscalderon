var express = require('express');
var router = express.Router();

const {
    createUser,
} = require('../controller/userController')

const {
    createUserValidator
} = require('../middleware/validators/userValidators')

const {
    verifyToken
} = require('../middleware/auth/auth')
    //falta jwt de validacion app
router.post('/createUser', createUserValidator, verifyToken, createUser);

module.exports = router;