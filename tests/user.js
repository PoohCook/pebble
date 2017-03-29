var user = require('./../modules/user');
const assert = require('assert');



var nxtUserId = user.findNextUserId(
    {
        "user1": {
            "name":"Pooh",
            "password":"password1",
            "profession":"teacher",
            "id":1
        },
        "user2":{
            "name":"Bunny",
            "password":"password2",
            "profession":"librarian",
            "id":2
        }
    });

assert(nxtUserId == 3, "should be 3 but was " + nxtUserId);


var err = user.validateUser();

assert(err);
assert(err.message == "User not provided", err.message );

err = user.validateUser({});
assert(err);
assert(err.message == "User must have name", err.message );


err = user.validateUser({name:"a name"});
assert(err);
assert(err.message == "User must have a profession", err.message );


err = user.validateUser({name:"a name", profession:"mopper"});
assert(!err);


// cycle tests
// var err = null;
// var aUser = null;
// var wait = true;
// user.add({}, function(errp, userp){ err = errp, aUser= userp, wait=false });
// while(wait);
// assert(err);
// assert(err.message == "User must have name", err.message );
//
//
// var wait = true;
// user.add({name:"testing1,2,3", profession:"tester"}, function(errp, userp){
//     wait=false, err = errp, aUser= userp;
// });
// while(wait);
// assert(!err, err.message);
// assert(aUser.name == "testing1,2,3", aUser.name );


