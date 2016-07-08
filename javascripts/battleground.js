'use strict';

var $ = require('jquery');
const Selectors = require('./selectors');
const Battleground = {};

let currentPlayer = {};
let currentOpponent = {};
let battleString = '';
let playerDmg;
let opponentDmg;
let startingPlayerHealth;
let startingOpponentHealth;
let roundCounter = 0;

Battleground.Initiate = function() {
  currentPlayer = Selectors.currentPlayer;
  currentOpponent = Selectors.currentOpponent;
  startingPlayerHealth = currentPlayer.health;
  startingOpponentHealth = currentOpponent.health;
};

Battleground.PassObjects = function() {
  Battleground.PlayerAttack(currentPlayer, currentOpponent);
};

Battleground.PlayerAttack = function(attacker, victim) {
  playerDmg = Battleground.CalcDamage(attacker);
  victim.health = victim.health - playerDmg;
  Battleground.OpponentAttack(currentOpponent, currentPlayer);
};

Battleground.OpponentAttack = function(attacker, victim) {
  opponentDmg = Battleground.CalcDamage(attacker);
  victim.health = victim.health - opponentDmg;
};

Battleground.CalcDamage = function(attacker) {
  let damage = 0;
  let critChance = Math.floor((Math.random() * 100) + 1);
  let missChance = Math.floor((Math.random() * 100) + 1);

  if (attacker.classMaster === 'Fighter') {
    damage = (attacker.strength * 0.1) + attacker.damage;
    if (critChance >= 81) {
      damage = damage * 1.5;
    }
    if (missChance >= 86) {
      damage = 0;
    }
  } else if (attacker.classMaster === 'Mage') {
    damage = (attacker.intelligence * 0.1) + attacker.damage;
    if (critChance >= 81) {
      damage = damage * 1.5;
    }
    if (missChance >= 86) {
      damage = 0;
    }
  } else if (attacker.classMaster === 'Stealth') {
    damage = (attacker.dexterity * 0.1) + attacker.damage;
    if (critChance >= 81) {
      damage = damage * 1.5;
    }
    if (missChance >= 86) {
      damage = 0;
    }
  }
  return damage;
};

Battleground.addHeroBattleCard = function() {
  let heroCardString = '';
  heroCardString += `
    <div class="heroCard">
      <div>${currentPlayer.name} the ${currentPlayer.class}</div>
      <div>Str: ${currentPlayer.strength}</div>
      <div>Int: ${currentPlayer.intelligence}</div>
      <div>Dex: ${currentPlayer.dexterity}</div>`;
  if (currentPlayer.health <= 0 && currentOpponent.health !== 0) {
    heroCardString += `<div>Health: 0</div>`;
  } else {
    heroCardString += `<div>Health: ${currentPlayer.health}</div>`;
  }
  heroCardString += `
      <div class="progress">
        <div id="cpHealth" class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: ${currentPlayer.health}%;">Health
        </div>
      </div>
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
      <div>Dex: ${currentOpponent.dexterity}</div>`;
  if (currentOpponent.health <= 0 && currentPlayer.health !== 0) {
    villainCardString += `<div>Health: 0</div>`;
  } else {
    villainCardString += `<div>Health: ${currentOpponent.health}</div>`;
  }
  villainCardString += `<div class="progress">
        <div id="coHealth" class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: ${currentOpponent.health}%;">Health
        </div>
      </div>
    </div>`;
  $('.villain').empty();
  $('.villain').append(villainCardString);
  $("#restartButton").hide();
  Battleground.updateHealth(currentPlayer.health, currentOpponent.health);
};

Battleground.updateHealth = function(heroHealth, villainHealth) {
  let $cpHealthBar = $('#cpHealth');
  let $coHealthBar = $('#coHealth');
  let heroHealthPercent = (heroHealth / startingPlayerHealth) * 100;
  let villainHealthPercent = (villainHealth / startingOpponentHealth) * 100;
  $cpHealthBar.css("width", `${heroHealthPercent}%`);
  $coHealthBar.css("width", `${villainHealthPercent}%`);
};

Battleground.addBattleStringCard = function() {
  roundCounter++;
  battleString += `
    <div class="battleCard">`;
  if (currentPlayer.health > 0 && currentOpponent.health > 0) {
    battleString = `<h3>ROUND ${roundCounter}</h3><div>${currentPlayer.name} wails the enemy with a ${currentPlayer.weapon || currentPlayer.spell} for ${playerDmg}.</div>
    <div>Kragnor strikes back with his ${currentOpponent.weapon || currentOpponent.spell} for ${opponentDmg}.<div>
      </div>`;
  } else {
    if (currentOpponent.health <= 0) {
      battleString = `
      <h3>ROUND ${roundCounter}</h3>
      <div>${currentPlayer.name} the ${currentPlayer.class} has vanquished that scum!</div>
      <div>${currentPlayer.name} wails the enemy with a ${currentPlayer.weapon || currentPlayer.spell} for ${playerDmg}.</div>`;
    } else {
      battleString = `
      <h3>ROUND ${roundCounter}</h3>
      <div>Kragnor the ${currentOpponent.class} has slain our hero!</div>
      <div>Kragnor strikes back with his ${currentOpponent.weapon || currentOpponent.spell} for ${opponentDmg}.<div>`;
    }
    $("#attackButton").hide();
    $("#restartButton").show();
  }
  $('.battle').prepend(battleString);
  //
};

module.exports = Battleground;