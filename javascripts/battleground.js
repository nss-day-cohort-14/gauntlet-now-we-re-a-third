'use strict';

const $ = require('jquery');
const Selectors = require('./selectors');
const Battleground = {};

let currentPlayer = {};
let currentOpponent = {};

Battleground.Initiate = function() {
  currentPlayer = Selectors.currentPlayer;
  currentOpponent = Selectors.currentOpponent;
};

Battleground.PassObjects = function() {
  Battleground.PlayerAttack(currentPlayer, currentOpponent);
};

Battleground.PlayerAttack = function(attacker, victim) {
  let critical = Battleground.CritChance();
  let miss = Battleground.MissChance();
  victim.health = victim.health - Battleground.CalcDamage(attacker, critical, miss);
  Battleground.OpponentAttack(currentOpponent, currentPlayer);
};

Battleground.OpponentAttack = function(attacker, victim) {
  let critical = Battleground.CritChance();
  let miss = Battleground.MissChance();
  victim.health = victim.health - Battleground.CalcDamage(attacker, critical, miss);
};

Battleground.CritChance = function() {
  let critical = null;
  let random = Math.round(Math.random() * 100);
  if (random > 80) {
    critical = true;
  } else if (random <= 80) {
    critical = false;
  }
  return critical;
};

Battleground.MissChance = function() {
  let miss = null;
  let random = Math.round(Math.random() * 100);
  if (random > 85) {
    miss = true;
  } else if (random <= 85) {
    miss = false;
  }
  return miss;
};

Battleground.CalcDamage = function(attacker, critical, miss) {
  let damage = 0;
  if (attacker.classMaster === 'Fighter') {
    damage = (attacker.strength * 0.1) + attacker.damage;
  } else if (attacker.classMaster === 'Mage') {
    damage = (attacker.intelligence * 0.1) + attacker.damage;
  } else if (attacker.classMaster === 'Stealth') {
    damage = (attacker.dexterity * 0.1) + attacker.damage;
  }
  if (critical === true) {
    damage = damage * 1.5;
  }
  if (miss === true) {
    damage = 0;
  }
  console.log("", damage);
  return damage;
};

Battleground.addHeroBattleCard = function() {
  let heroCardString = '';
    heroCardString += `
    <div class="heroCard">
      <div>${currentPlayer.name} the ${currentPlayer.class}</div>
      <div>Str: ${currentPlayer.strength}</div> 
      <div>Int: ${currentPlayer.intelligence}</div> 
      <div>Dex: ${currentPlayer.dexterity}</div>                  
      <div>Health: ${currentPlayer.health}</div>
    </div>`;
  $('.hero').append(heroCardString);
}

Battleground.addVillainBattleCard = function() {
  let villainCardString = '';
    villainCardString += `
    <div class="villainCard">
      <div>Kragnor the ${currentOpponent.class}</div>
      <div>Str: ${currentOpponent.strength}</div> 
      <div>Int: ${currentOpponent.intelligence}</div> 
      <div>Dex: ${currentOpponent.dexterity}</div>                  
      <div>Health: ${currentOpponent.health}</div>
    </div>`;
  $('.villain').append(villainCardString);
}

module.exports = Battleground;