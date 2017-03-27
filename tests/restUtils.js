var restUtils = require('./../modules/restUtils');
const assert = require('assert');


var nxtUserId = restUtils.findNextUserId(
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


var err = restUtils.validateUser();

assert(err);
assert(err.message == "User not provided", err.message );

var err = restUtils.validateUser({});
assert(err);
assert(err.message == "User must have name", err.message );


var err = restUtils.validateUser({name:"a name"});
assert(err);
assert(err.message == "User must have a profession", err.message );


var err = restUtils.validateUser({name:"a name", profession:"mopper"});
assert(!err);

