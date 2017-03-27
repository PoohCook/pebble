var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var date = new Date();
  res.render('index', { title: 'Pebbles', rendered: date.toTimeString() });
});

module.exports = router;
