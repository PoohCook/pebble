/**
 * Rest Handlers
 * Created by hunnytree on 3/27/17.
 */


var User = require('./user');

exports.init = function(app) {


    app.get('/listUsers', function (req, res) {
        User.getAll( function (err, data) {
            console.log(data);
            res.end(JSON.stringify(data));
        });
    });


    app.post('/AddUser', function (req, res) {
        User.add( req.body, function (err, newUser) {
            if (err) {
                res.status(400).end(err.message)
            }
            else res.end(JSON.stringify(newUser));
        });
    });

    return exports;

};


