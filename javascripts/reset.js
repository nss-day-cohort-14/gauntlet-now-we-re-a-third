"use strict";
const Selectors = require('./selectors.js');

var Reset = function() {
  Selectors.currentPlayer = {};
  Selectors.currentOpponent = {};
};
//test push

module.exports = Reset;