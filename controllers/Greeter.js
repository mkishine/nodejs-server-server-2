'use strict';

const utils = require('../utils/writer.js');
const Greeter = require('../service/GreeterService');

module.exports.getGreeting = function getGreeting (req, res) {
  const name = req.swagger.params['name'].value;
  Greeter.getGreeting(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
