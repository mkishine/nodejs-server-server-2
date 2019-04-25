'use strict';

const utils = require('../utils/writer.js');
const Tree = require('../service/TreeService');

module.exports.getTree = function (req, res) {
  const name = req.swagger.params['name'].value;
  Tree.getTree(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
