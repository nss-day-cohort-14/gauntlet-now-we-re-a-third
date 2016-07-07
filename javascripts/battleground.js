'use strict';

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
  victim.health = victim.health - Battleground.CalcDamage(attacker, critical);
  Battleground.OpponentAttack(currentOpponent, currentPlayer);
};

Battleground.OpponentAttack = function(attacker, victim) {
  let critical = Battleground.CritChance();
  victim.health = victim.health - Battleground.CalcDamage(attacker, critical);
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

Battleground.CalcDamage = function(attacker, critical) {
  let damage = 0;
  if (attacker.classMaster === 'Fighter') {
    damage = (attacker.strength * 0.1) + attacker.damage;
  } else if (attacker.classMaster === 'Mage') {
    damage = (attacker.intelligence * 0.1) + attacker.damage;
  }
  if (critical === true) {
    damage = damage * 1.5;
  }
  return damage;
};

module.exports = Battleground;