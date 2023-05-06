"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../modules/user.schema'),
    Users = _require.Users;

var _ = require('lodash');

var bcrypt = require('bcrypt');

var joi = require('joi');

router.post('/', function _callee(req, res) {
  var _validate$validate, error, user, checkpassword;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _validate$validate = validate.validate(req.body), error = _validate$validate.error;
          if (error) res.send('erro');
          _context.next = 4;
          return regeneratorRuntime.awrap(Users.findOne({
            email: req.body.email
          }));

        case 4:
          user = _context.sent;
          if (!user) res.status(404).send('In validata email or password');
          _context.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, user.password));

        case 8:
          checkpassword = _context.sent;
          if (!checkpassword) res.send('In validata email or password');
          res.send('ok');

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
});
var validate = joi.object({
  email: joi.string().min(4).required().email(),
  password: joi.string().min(8).max(2014).required()
});
module.exports = router;