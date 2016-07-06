"use strict";

var $ = require('jquery');
const Gauntlet = require('./player');
const domBuild = require('./domBuild.js');
const Classes = require('./classes');
const Weapons = require('./weapons');
const Spells = require('./spells');

var Selectors = {};

Selectors.chooseRace = function() {
  let race = $(this).children()[1].innerHTML;
  if (race === 'Human') {
    Gauntlet.player1 = new Gauntlet.Combatants.Human(Gauntlet.player1.name);
    domBuild.addClassCards(Gauntlet.player1.allowedClasses);
  } else if (race === 'Orc') {
    Gauntlet.player1 = new Gauntlet.Combatants.Orc(Gauntlet.player1.name);
    domBuild.addClassCards(Gauntlet.player1.allowedClasses);
  }
  console.log("", Gauntlet.player1);
};

Selectors.chooseClass = function() {
  let selectedClass = $(this).children()[1].innerHTML;
  Gauntlet.player1.class = new Classes.GuildHall[selectedClass]();
};

Selectors.chooseWeapon = function() {
  let magical = Gauntlet.player1.class.magical;
  if (magical === true) {
    domBuild.addAttackCards(Gauntlet.player1.class.spellArray);
  } else if (magical === false) {
    domBuild.addAttackCards(Gauntlet.player1.class.weaponArray);
  }
};

Selectors.addAttacks = function() {
  let magical = Gauntlet.player1.class.magical;
  let selectedAttack = $(this).children()[1].innerHTML;
  if (magical === false) {
    Gauntlet.player1.setWeapon(new Weapons[selectedAttack]());
  } else if (magical === true) {
    Gauntlet.player1.setSpell(new Spells[selectedAttack]());
  }
  console.log("", Gauntlet.player1);
};

module.exports = Selectors;






// console.log("Health", Gauntlet.player1.health);
// console.log("Health Bonus", Gauntlet.player1.class.healthBonus);
// console.log("Health Total", Gauntlet.player1.health + Gauntlet.player1.class.healthBonus);
// console.log("Strength", Gauntlet.player1.strength);
// console.log("Strength Bonus", Gauntlet.player1.class.strengthBonus);
// console.log("Strength Total", Gauntlet.player1.strength + Gauntlet.player1.class.strengthBonus);
// console.log("Magic", Gauntlet.player1.class.magical);