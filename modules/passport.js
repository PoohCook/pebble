

var flash = require('connect-flash');

var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./user');



exports.init = function (app) {

    app.use(flash());
    passport.serializeUser(function (user, done) {
        console.log("serializeUser");
        console.log(user);
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        console.log("deserializeUser");
        console.log(user);
        done(null, user);
    });

    passport.use(new LocalStrategy({
            passReqToCallback: true
        },
        function (req, username, password, done) {
            User.findOne({name: username}, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {message: 'Incorrect username.'});
                }
                if (!user.validPassword(password)) {
                    return done(null, false, {message: 'Incorrect password.'});
                }
                console.log("valid user");
                console.log(user);
                return done(null, user);
            });
        }
    ));

    app.use(session({secret: '{secret}', name: 'session_id', saveUninitialized: false, resave: false}));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(function (request, response, next) {

        console.log("------------");
        console.log(request.session);
        console.log("checkAuth isAuthenticated: " + request.isAuthenticated());
        next();
    });


    app.post('/login', function (req, res, next) {

        var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/';
        delete req.session.redirectTo;

        passport.authenticate('local', {
            successRedirect: redirectTo,
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    });


    return exports;
};

exports.isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    req.session.redirectTo = req.baseUrl;
    res.redirect('/login');
};