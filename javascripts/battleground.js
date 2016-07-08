'use strict';

var $ = require('jquery');
const Selectors = require('./selectors');
const Battleground = {};

let currentPlayer = {};
let currentOpponent = {};
let battleString = '';

Battleground.Initiate = function() {
  currentPlayer = Selectors.currentPlayer;
  currentOpponent = Selectors.currentOpponent;
};

Battleground.PassObjects = function() {
  Battleground.PlayerAttack(currentPlayer, currentOpponent);
};

Battleground.PlayerAttack = function(attacker, victim) {
  // let critical = Battleground.CritChance();
  // let miss = Battleground.MissChance();
  victim.health = victim.health - Battleground.CalcDamage(attacker);
  Battleground.OpponentAttack(currentOpponent, currentPlayer);
};

Battleground.OpponentAttack = function(attacker, victim) {
  // let critical = Battleground.CritChance();
  // let miss = Battleground.MissChance();
  victim.health = victim.health - Battleground.CalcDamage(attacker);
};

// Battleground.CritChance = function() {
//   let critical = null;
//   let random = Math.round(Math.random() * 100);
//   if (random > 80) {
//     critical = true;
//   } else if (random <= 80) {
//     critical = false;
//   }
//   return critical;
// };

// Battleground.MissChance = function() {
//   let miss = null;
//   let random = Math.round(Math.random() * 100);
//   if (random > 85) {
//     miss = true;
//   } else if (random <= 85) {
//     miss = false;
//   }
//   return miss;
// };

Battleground.CalcDamage = function(attacker) {
  let damage = 0;
  let critChance = Math.floor((Math.random() * 100) + 1);

  if (attacker.classMaster === 'Fighter') {
    damage = (attacker.strength * 0.1) + attacker.damage;
    if (critChance >= 81) {
      damage = damage * 1.5;
    }
  } else if (attacker.classMaster === 'Mage') {
    damage = (attacker.intelligence * 0.1) + attacker.damage;
    if (critChance >= 81) {
      damage = damage * 1.5;
    }
  } else if (attacker.classMaster === 'Stealth') {
    damage = (attacker.dexterity * 0.1) + attacker.damage;
    if (critChance >= 81) {
      damage = damage * 1.5;
    }
  }
  console.log("attacker", damage);
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
  $('.hero').empty();
  $('.hero').append(heroCardString);
};

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
  $('.villain').empty();
  $('.villain').append(villainCardString);
};

Battleground.addBattleStringCard = function() {
    let playerDmg = Battleground.CalcDamage(currentPlayer);
    let opponentDmg = Battleground.CalcDamage(currentOpponent);
    // Health bar animation
    battleString += `
    <div class="battleCard">`;
    if (currentPlayer.health > 0 && currentOpponent.health > 0) {
      battleString = `${currentPlayer.name} wails the enemy with a ${currentPlayer.weapon || currentPlayer.spell} for ${playerDmg}.  Kragnor strikes back with his ${currentOpponent.weapon || currentOpponent.spell} for ${opponentDmg}.
      </div>`;
      //console.log("battleString", battleString);
      console.log("playerDmg", playerDmg);
      console.log("opponentDmg", opponentDmg);
      // Delay attacks logic
    } else { 
      if (currentPlayer.health <= 0) {
        battleString = `
        <div>Kragnor the ${currentOpponent.class} has slain our hero!</div>`;
        // If health < 0 health = 0
      } else {
        battleString = `<div>${currentPlayer.name} the ${currentPlayer.class} has vanquished that scum!</div>`;
        // If health < 0 health = 0        
      }
      // show restart/ hide attack
    }
  $('.battle').append(battleString);
  //
};

module.exports = Battleground;