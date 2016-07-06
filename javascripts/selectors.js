"use strict";

var $ = require('jquery');
const Gauntlet = require('./player');
const domBuild = require('./domBuild.js');

var Selectors = {};

Selectors.chooseClass = function() {
  let race = $(this).children()[1].innerHTML;
  if (race === 'Human') {
    Gauntlet.player1 = new Gauntlet.Combatants.Human(Gauntlet.player1.name);
    domBuild.main(Gauntlet.player1.allowedClasses);
  } else if (race === 'Orc') {
    Gauntlet.player1 = new Gauntlet.Combatants.Orc(Gauntlet.player1.name);
    domBuild.main(Gauntlet.player1.allowedClasses);
  }
  console.log("", Gauntlet.player1);
}

module.exports = Selectors;