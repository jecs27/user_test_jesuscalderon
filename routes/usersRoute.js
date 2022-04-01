var express = require('express');
var router = express.Router();

const {
    createUser,
} = require('../controller/userController')

const {
    createUserValidator
} = require('../middleware/validators/userValidators')
    //falta jwt de validacion app
router.post('/createUser', createUserValidator, createUser);

module.exports = router;