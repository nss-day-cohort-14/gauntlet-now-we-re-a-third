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
    Gauntlet.player1.setSpell(new Spells.SpellBook[selectedAttack]());
  }
};

Selectors.buildPlayerObject = function() {

  let magical = Gauntlet.player1.class.magical;

  let currentPlayer = {
    name: Gauntlet.player1.playerName,
    health: Gauntlet.player1.health + Gauntlet.player1.class.healthBonus,
    strength: Gauntlet.player1.strength + Gauntlet.player1.class.strengthBonus,
    intelligence: Gauntlet.player1.intelligence,
    species: Gauntlet.player1.species,
    class: Gauntlet.player1.class.name
  };
  if (magical === false) {
    currentPlayer.weapon = Gauntlet.player1.weapon.name;
    currentPlayer.damage = Gauntlet.player1.weapon.damage;
  } else if (magical === true) {
    currentPlayer.spell = Gauntlet.player1.spell.name;
    currentPlayer.spellType = Gauntlet.player1.spell.type;
    currentPlayer.damage = Gauntlet.player1.spell.damage;
  }
  console.log("", currentPlayer);
};

module.exports = Selectors;