'use strict';
// load our initial obj constructor so we can add prototypes
const Player = require('./player');

/*
  TODO: Modularize this code with IIFE or Browserify
*/

Player.GuildHall = {};

/*
  Base function for a player, or enemy, class (profession)
 */
Player.GuildHall.PlayerClass = function() {
  this.name = "Beggar";
  this.healthBonus = 0;
  this.strengthBonus = 0;
  this.intelligenceBonus = 0;
  this.dexterityBonus = 0;
  this.magical = false;

  this.toString = function() {
    return this.name;
  };
};

/*
    FIGHTER CLASSES
      - Warrior
      - Valkyrie
      - Berserker
      - Monk
 */
Player.GuildHall.Fighter = function() {
  this.magical = false;  
  this.healthBonus = 20;
  this.strengthBonus = 10;
  this.weaponArray = ['Dagger', 'WarAxe', 'BroadSword'];
  this.classMaster = 'Fighter';
};
Player.GuildHall.Fighter.prototype = new Player.GuildHall.PlayerClass();


Player.GuildHall.Warrior = function() {
  this.name = "Warrior";
  this.healthBonus = this.healthBonus + 25;
  this.strengthBonus = this.strengthBonus + 30;
  this.intelligenceBonus = this.intelligenceBonus - 10;
  this.dexterityBonus = this.dexterityBonus + 5;  
};
Player.GuildHall.Warrior.prototype = new Player.GuildHall.Fighter();


Player.GuildHall.Valkyrie = function() {
  this.name = "Valkyrie";
  this.healthBonus = this.healthBonus + 20;
  this.strengthBonus = this.strengthBonus + 10;
  this.intelligenceBonus = this.intelligenceBonus + 0;
  this.dexterityBonus = this.dexterityBonus + 8;  
};
Player.GuildHall.Valkyrie.prototype = new Player.GuildHall.Fighter();


Player.GuildHall.Berserker = function() {
  this.name = "Berserker";
  this.healthBonus = this.healthBonus + 35;
  this.strengthBonus = this.strengthBonus + 20;
  this.intelligenceBonus = this.intelligenceBonus - 15;
  this.dexterityBonus = this.dexterityBonus + 10;
};
Player.GuildHall.Berserker.prototype = new Player.GuildHall.Fighter();


Player.GuildHall.Monk = function() {
  this.name = "Monk";
  this.healthBonus = this.healthBonus + 10;
  this.strengthBonus = this.strengthBonus + 40;
  this.intelligenceBonus = this.intelligenceBonus + 10;
  this.dexterityBonus = this.dexterityBonus + 12;  
};
Player.GuildHall.Monk.prototype = new Player.GuildHall.Fighter();


/*
    MAGICAL CLASSES
      - Shaman
      - Wizard
      - Conujurer
      - Sorcerer
 */
Player.GuildHall.Mage = function() {
  this.magical = true;
  this.healthBonus = this.healthBonus - 10;
  this.strengthBonus = this.strengthBonus - 20;
  this.intelligenceBonus = this.intelligenceBonus + 20;
  this.spellArray = ['Sphere', 'Tome', 'Staff', 'Chicken'];
  this.classMaster = 'Mage';
};
Player.GuildHall.Mage.prototype = new Player.GuildHall.PlayerClass();


Player.GuildHall.Shaman = function() {
  this.name = "Shaman";
  this.healthBonus = this.healthBonus + 5;
  this.strengthBonus = this.strengthBonus - 10;
  this.intelligenceBonus = this.intelligenceBonus + 20;
  this.dexterityBonus = this.dexterityBonus - 10;  
};
Player.GuildHall.Shaman.prototype = new Player.GuildHall.Mage();


Player.GuildHall.Wizard = function() {
  this.name = "Wizard";
  this.healthBonus = this.healthBonus - 15;
  this.strengthBonus = this.strengthBonus - 25;
  this.intelligenceBonus = this.intelligenceBonus + 40;
  this.dexterityBonus = this.dexterityBonus - 15;  
};
Player.GuildHall.Wizard.prototype = new Player.GuildHall.Mage();


Player.GuildHall.Conjurer = function() {
  this.name = "Conjurer";
  this.strengthBonus = this.strengthBonus - 10;
  this.intelligenceBonus = this.intelligenceBonus + 10;
  this.dexterityBonus = this.dexterityBonus - 15;   
};
Player.GuildHall.Conjurer.prototype = new Player.GuildHall.Mage();


Player.GuildHall.Sorcerer = function() {
  this.name = "Sorcerer";
  this.healthBonus = this.healthBonus - 5;
  this.strengthBonus = this.strengthBonus - 20;
  this.intelligenceBonus = this.intelligenceBonus + 30;
  this.dexterityBonus = this.dexterityBonus - 15; 
};
Player.GuildHall.Sorcerer.prototype = new Player.GuildHall.Mage();


/*
    STEALTH CLASSES
      - Rogue
      - Assassin
      - Ninja
      - Mime            
 */
Player.GuildHall.Stealth = function() {
  this.magical = false;
  this.healthBonus = this.healthBonus + 10;
  this.dexterityBonus = this.dexterityBonus + 20;
  this.intelligenceBonus = this.intelligenceBonus + 5;
  this.weaponArray = ['Dagger', 'WarAxe', 'BroadSword']; 
  this.classMaster = 'Stealth';
};
Player.GuildHall.Stealth.prototype = new Player.GuildHall.PlayerClass();


Player.GuildHall.Rogue = function() {
  this.name = "Rogue";
  this.healthBonus = this.healthBonus + 5;
  this.strengthBonus = this.strengthBonus - 10;
  this.intelligenceBonus = this.intelligenceBonus + 10;
  this.dexterityBonus = this.dexterityBonus + 20;   
};
Player.GuildHall.Rogue.prototype = new Player.GuildHall.Mage();


Player.GuildHall.Assassin = function() {
  this.name = "Assassin";
  this.healthBonus = this.healthBonus - 15;
  this.strengthBonus = this.strengthBonus - 15;
  this.intelligenceBonus = this.intelligenceBonus + 15;
  this.dexterityBonus = this.dexterityBonus + 30;   
};
Player.GuildHall.Assassin.prototype = new Player.GuildHall.Mage();


Player.GuildHall.Ninja = function() {
  this.name = "Ninja";
  this.strengthBonus = this.strengthBonus - 10;
  this.intelligenceBonus = this.intelligenceBonus + 10;
  this.dexterityBonus = this.dexterityBonus + 35; 
};
Player.GuildHall.Ninja.prototype = new Player.GuildHall.Mage();


Player.GuildHall.Mime = function() {
  this.name = "Mime";
  this.healthBonus = this.healthBonus - 5;
  this.strengthBonus = this.strengthBonus - 20;
  this.intelligenceBonus = this.intelligenceBonus + 20;
  this.dexterityBonus = this.dexterityBonus + 35; 
};
Player.GuildHall.Mime.prototype = new Player.GuildHall.Mage();

// export obj for browserify
module.exports = Player;