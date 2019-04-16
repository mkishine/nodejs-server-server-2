'use strict';


/**
 * Returns the best greeting for a requested name
 *
 * name String
 * returns Greeting
 **/
exports.getGreeting = function (name) {
    return new Promise(function (resolve) {
        let examples = {};
        examples['application/json'] = {
            "___greeting": "Greeting, " + name + "!"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
};

