
var fs = require("fs");
var userFileName = __dirname + "/../" + "users.json";

function readUsersFile(f) {
    fs.readFile(userFileName, 'utf8', function (err, data) {
        f(err, JSON.parse(data));
    });
}

function updateUsersFile(users, f) {
    fs.writeFile(userFileName, JSON.stringify(users, null, ' '), 'utf8', function (err) {
        f(err);
    });
}

exports.findNextUserId = function(data) {
    var newUserId = 0;
    Object.keys(data).forEach(function (key) {
        var user = data[key];
        if (user.id > newUserId) newUserId = user.id;
    });
    newUserId++;
    return newUserId
};


exports.validateUser = function(user){

    if (!user) {
        return ({message: "User not provided"})
    }
    else if (!user.name) {
        return ({message: "User must have name"})
    }
    else if (!user.profession) {
        return ({message: "User must have a profession"})
    }

    return null;

};


exports.getAll = function(f) {
    readUsersFile(f)
};

exports.add = function( newUser, f ) {

    var err = exports.validateUser(newUser);
    if (err) {
        f(err, null);
    }
    else exports.getAll( function (err, users) {

        var newUserId = exports.findNextUserId(users);
        newUser.id = newUserId;
        users["user" + newUserId] = newUser;
        console.log(users);

        updateUsersFile( users, function (err) {
            if (err) {
                f(err,null);
            }
            else f(err, newUser);
        });
    })
};

exports.remove = function( remUser, f ) {

    exports.getAll( function (err, users) {

        var userId = "user" + remUser.id;
        if( !users[userId] ) return f({message:"user cannot be removed since it does not exist"});

        delete users[userId];
        console.log(users);

        updateUsersFile( users, function (err) {
            if (err) {
                f(err,null);
            }
            else f(err, newUser);
        });
    })
};



exports.findOne = function (param, f) {

    var userName = param.name;
    if(!userName){
        f({message:"no user specified"}, null);
    }
    else exports.getAll( function (err, users) {
        if( err){
            f(err, null);
        }else {
            var theUser = null;
            Object.keys(users).forEach(function (key) {
                var user = users[key];
                if (user.name == userName) {
                    theUser = user;
                    return -1;
                }

            });

            if( theUser){
                theUser.validPassword = function(password){
                    return this.password == password;
                }
            }

            f(null, theUser);

        }


    });

};


