<<<<<<< Updated upstream
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
=======
const userRoute = require('./userRoute');

module.exports = {
    userRoute,
};
>>>>>>> Stashed changes
