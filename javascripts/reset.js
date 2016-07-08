"use strict";
const Selectors = require('./selectors.js');
const Battleground = require('./battleground');
var $ = require('jquery');

var Reset = function() {
  Selectors.currentPlayer = {};
  Selectors.currentOpponent = {};
  $('.battle').empty();
  $("#attackButton").show();
};

module.exports = Reset;