/**
 * Created by hunnytree on 3/27/17.
 */


var fs = require("fs");
var userFileName = __dirname + "/../" + "users.json";
var restUtils = require('./restUtils');


function init(app) {


    app.get('/listUsers', function (req, res) {
        fs.readFile(userFileName, 'utf8', function (err, data) {
            console.log(data);
            res.end(data);
        });
    });


    app.post('/AddUser', function (req, res) {

        var newUser = req.body;

        var err = restUtils.validateUser(newUser);
        if (err) {
            res.status(400).end(err.message)
        }
        else fs.readFile(userFileName, 'utf8', function (err, data) {
                data = JSON.parse(data);

                var newUserId = restUtils.findNextUserId(data);
                newUser.id = newUserId;
                data["user" + newUserId] = newUser;
                console.log(data);

                fs.writeFile(userFileName, JSON.stringify(data), 'utf8', function (err) {
                    if (err) {
                        res.status(400).end(err.message)
                    }
                    else res.end(JSON.stringify(data));
                });
            })
    });



}



exports.init = init;
