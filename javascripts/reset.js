"use strict";
const Selectors = require('./selectors.js');
const Battleground = require('./battleground');
var $ = require('jquery');

var Reset = function() {
  Battleground.roundCounter = 0;
  Selectors.currentPlayer = {};
  Selectors.currentOpponent = {};
  $('.battle').empty();
  $("#attackButton").show();
  $('#player-name').val('');
};

module.exports = Reset;