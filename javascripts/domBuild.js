"use strict";

var $ = require('jquery');
const Gauntlet = require('./player');
const Classes = require('./classes');

var domBuild = {}

domBuild.main = function(classArray) {
  let htmlString = '';
  let colCounter = 0;
  for (let i = 0; i < classArray.length; i++) {
    if (colCounter === 0) {
      htmlString += `<div class="col-sm-4">`
    }
    colCounter++;
    htmlString += `<div class="card__button">
        <a class="class__link btn btn--big btn--blue class" href="#">
          <span class="btn__prompt">></span>
          <span class="btn__text">${classArray[i]}</span>
        </a>
      </div>`
    if (colCounter === 3 || i + 1 === classArray.length) {
      htmlString += `</div>`
    }
  }
  $('#input').append(htmlString);
  $('.class').on('click', function() {
    let selectedClass = $(this).children()[1].innerHTML;
    Gauntlet.player1.class = new Classes.GuildHall[selectedClass]();
    console.log("Player 1 Object", Gauntlet.player1);
    console.log("Health", Gauntlet.player1.health);
    console.log("Health Bonus", Gauntlet.player1.class.healthBonus);
    console.log("Health Total", Gauntlet.player1.health + Gauntlet.player1.class.healthBonus);
    console.log("Strength", Gauntlet.player1.strength);
    console.log("Strength Bonus", Gauntlet.player1.class.strengthBonus);
    console.log("Strength Total", Gauntlet.player1.strength + Gauntlet.player1.class.strengthBonus);
    console.log("Magic", Gauntlet.player1.class.magical);
  })
};

module.exports = domBuild;