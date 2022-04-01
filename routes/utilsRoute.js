var express = require('express');
var router = express.Router();

const {
    getTokenApplication,
} = require('../controller/utilsController')

router.post('/test', getTokenApplication);

module.exports = router;