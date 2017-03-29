/**
 * Routes for main page
 * Created by hunnytree on 3/28/17.
 *
 */

var express = require('express');
var router = express.Router();
var passport = require("../modules/passport");


/* GET home page. */
router.get('/', passport.isAuthenticated, function(req, res){
    var date = new Date();
    res.render('main', { title: 'Pebbles Main', rendered: date.toTimeString() });
});




module.exports = router;
