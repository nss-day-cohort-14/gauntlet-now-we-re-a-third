"use strict";

var $ = require('jquery');
const Gauntlet = require('./player');
const domBuild = require('./domBuild.js');
const Classes = require('./classes');
const Weapons = require('./weapons');
const Spells = require('./spells');

var Selectors = {};

Selectors.currentPlayer = {};
Selectors.currentOpponent = {};

Selectors.chooseRace = function() {
  //pulls text from inside clicked button
  let race = $(this).children()[1].innerHTML;
  //checks if text is human or orc
  if (race === 'Human') {
    //instantiates new player1 object passing in the given name
    Gauntlet.player1 = new Gauntlet.Combatants.Human(Gauntlet.player1.name);
    //builds only appropriate cards depending on which button was clicked
    domBuild.addClassCards(Gauntlet.player1.allowedClasses);
  } else if (race === 'Orc') {
    Gauntlet.player1 = new Gauntlet.Combatants.Orc(Gauntlet.player1.name);
    domBuild.addClassCards(Gauntlet.player1.allowedClasses);
  }
};

Selectors.chooseClass = function() {
  //pulls text from clicked class button
  let selectedClass = $(this).children()[1].innerHTML;
  //instantiates class corresponding to button on player1 class property
  Gauntlet.player1.class = new Classes.GuildHall[selectedClass]();
};

Selectors.chooseWeapon = function() {
  //checks if player has chosen a magical class or not
  let magical = Gauntlet.player1.class.magical;
  if (magical === true) {
    //builds cards for spells if player has chosen magical class
    domBuild.addAttackCards(Gauntlet.player1.class.spellArray);
  } else if (magical === false) {
    //builds cards for weapons if player has not chosen magical class
    domBuild.addAttackCards(Gauntlet.player1.class.weaponArray);
  }
};

Selectors.addAttacks = function() {
  //checks if player has chosen a magical class or not
  let magical = Gauntlet.player1.class.magical;
  //pulls text from clicked attack button
  let selectedAttack = $(this).children()[1].innerHTML;
  if (magical === false) {
    //instantiates corresponding weapon on player object
    Gauntlet.player1.setWeapon(new Weapons[selectedAttack]());
  } else if (magical === true) {
    //instantiates corresponding spell on player object
    Gauntlet.player1.setSpell(new Spells.SpellBook[selectedAttack]());
  }
};

Selectors.buildPlayerObject = function() {
  //checks if player has chosen a magical class or not
  let playerMagical = Gauntlet.player1.class.magical;
  //build more usable object for player to enter battle arena
  Selectors.currentPlayer = {
    //sets name property 
    name: Gauntlet.player1.playerName,
    //adds base health with health bonus to set health property
    health: Gauntlet.player1.health + Gauntlet.player1.class.healthBonus,
    //adds base strength with strength bonus to set strength property
    strength: Gauntlet.player1.strength + Gauntlet.player1.class.strengthBonus,
    //sets intelligence property
    intelligence: Gauntlet.player1.intelligence,
    //sets species property
    species: Gauntlet.player1.species,
    //sets class name property
    class: Gauntlet.player1.class.name,
    //adds base dexterity with dexterity bonus to set dexterity property
    dexterity: Gauntlet.player1.dexterity + Gauntlet.player1.class.dexterityBonus,
    classMaster: Gauntlet.player1.class.classMaster
  };
  if (playerMagical === false) {
    //sets weapon name property
    Selectors.currentPlayer.weapon = Gauntlet.player1.weapon.name;
    //sets weapon damage property
    Selectors.currentPlayer.damage = Gauntlet.player1.weapon.damage;
  } else if (playerMagical === true) {
    //sets spell name property
    Selectors.currentPlayer.spell = Gauntlet.player1.spell.name;
    //sets spell type property
    Selectors.currentPlayer.spellType = Gauntlet.player1.spell.type;
    //sets spell damage property
    Selectors.currentPlayer.damage = Gauntlet.player1.spell.damage;
  }

  //instantiate new orc as opponent
  let opponent = new Gauntlet.Combatants.Orc();
  //randomly generate class for opponent
  opponent.generateClass();

  let opponentMagical = opponent.class.magical;

  //build more usable object for opponent to enter battle arena
  Selectors.currentOpponent = {
    name: 'Opponent',
    health: opponent.health + opponent.class.healthBonus,
    strength: opponent.strength + opponent.class.strengthBonus,
    intelligence: opponent.intelligence,
    species: opponent.species,
    class: opponent.class.name,
    classMaster: opponent.class.classMaster,
    dexterity: opponent.dexterity + opponent.class.dexterityBonus
  };
  console.log("", Selectors.currentOpponent);
  if (opponentMagical === false) {
    opponent.setWeapon(new Weapons.BroadSword());
    Selectors.currentOpponent.weapon = opponent.weapon.name;
    Selectors.currentOpponent.damage = opponent.weapon.damage;
  } else if (opponentMagical === true) {
    opponent.setSpell(new Spells.SpellBook.Tome());
    Selectors.currentOpponent.spell = opponent.spell.name;
    Selectors.currentOpponent.spellType = opponent.spell.type;
    Selectors.currentOpponent.damage = opponent.spell.damage;
  }
};

module.exports = Selectors;