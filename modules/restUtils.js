


 exports.findNextUserId = function(data) {
    var newUserId = 0;
    Object.keys(data).forEach(function (key) {
        var user = data[key];
        if (user.id > newUserId) newUserId = user.id;
    })
    newUserId++;
    return newUserId
}


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

}