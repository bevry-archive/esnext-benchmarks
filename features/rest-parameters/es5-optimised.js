// https://github.com/jashkenas/coffeescript/issues/3274
'use strict'
module.exports = function () {
    var args = new Array(arguments.length);
    for (var i = 0; i< arguments.length; i++) {
            args[i] = arguments[i];
    }
    return null
}
