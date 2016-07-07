"use strict";
const Selectors = require('./selectors.js');

var Reset = function() {
  Selectors.currentPlayer = {};
  Selectors.currentOpponent = {};
};

module.exports = Reset;