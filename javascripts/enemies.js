'use strict';

// load our initial obj constructor so we can add prototypes
const Player = require('./player');
const Classes = require('./classes');

Player.Combatants.Orc = function(name) {
  this.playerName = name;
  this.health = this.health + 20;
  this.species = "Orc";
  this.allowedClasses = ["Warrior", "Berserker", "Shaman", "Conjurer", "Ninja", "Mime"];

  this.generateClass = function() {
    // Get a random index from the allowed classes array
    var random = Math.round(Math.random() * (this.allowedClasses.length - 1));

    // Get the string at the index
    var randomClass = this.allowedClasses[random];

    // Composes the corresponding player class into the player object
    this.class = new Classes.GuildHall[randomClass]();
    return this.class;
  };
};

Player.Combatants.Orc.prototype = new Player.Combatants.Monster();

// export our modfied obj 
module.exports = Player;