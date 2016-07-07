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
  console.log("before attack", victim);
  victim.health = victim.health - Battleground.CalcDamage(attacker);
  console.log("after attack", victim);
  Battleground.OpponentAttack(currentOpponent, currentPlayer);
};

Battleground.OpponentAttack = function(attacker, victim) {
  console.log("before attack", victim);
  victim.health = victim.health - Battleground.CalcDamage(attacker);
  console.log("after attack", victim);
};

Battleground.CalcDamage = function(attacker) {
  let damage = 0;
  if (attacker.classMaster === 'Fighter') {
    damage = (attacker.strength * 0.1) + attacker.damage;
  } else if (attacker.classMaster === 'Mage') {
    damage = (attacker.intelligence * 0.1) + attacker.damage;
  }
  return damage;
};




module.exports = Battleground;