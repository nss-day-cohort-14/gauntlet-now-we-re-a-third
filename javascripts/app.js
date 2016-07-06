'use strict';
const Gauntlet = require('./player');
const Enemies = require('./enemies');
const Classes = require('./classes');
const Weapons = require('./weapons');
const Spells = require('./spells');
const Selectors = require('./selectors.js');
const buildDom = require('./domBuild.js');
var $ = require('jquery');

// console.log("Gauntlet", Gauntlet);
// console.log("Classes", Classes);
// console.log("Weapons", Weapons);
// console.log("Spells", Spells);
// console.log("Selectors", Selectors);
// console.log("Dom Build", buildDom);
/*
  Test code to generate a human player and an orc player
*/
// var warrior = new Gauntlet.Combatants.Human('John');
// warrior.setWeapon(new Weapons.WarAxe());
// warrior.generateClass(); // This will be used for "Surprise me" option
// console.log(warrior.toString());

// var orc = new Gauntlet.Combatants.Orc('Winston');
// orc.class = new Classes.GuildHall.Shaman();
// orc.setWeapon(new Spells.SpellBook.Sphere());
// console.log(orc.toString());

// console.log("orc", orc);
// console.log("human", warrior);

/*
  Test code to generate a spell
 */
// var spell = new Spells.SpellBook.Sphere();
// console.log("Spell: ", spell.toString());


$(document).ready(function() {
  /*
    Show the initial view that accepts player name
   */
  $("#player-setup").show();

  /*
    When any button with card__link class is clicked,
    move on to the next view.
   */
  $(".card__link").click(function(e) {
    var nextCard = $(this).attr("next");
    var moveAlong = false;

    switch (nextCard) {
      case "card--race":
        moveAlong = ($("#player-name").val() !== "");
        break;
      case "card--class":
        moveAlong = ($("#player-name").val() !== "");
        break;
      case "card--weapon":
        moveAlong = ($("#player-name").val() !== "");
        break;
    }

    if (moveAlong) {
      $(".card").hide();
      $("." + nextCard).show();
    }
  });

  /*
    When the back button clicked, move back a view
   */
  $(".card__back").click(function(e) {
    var previousCard = $(this).attr("previous");
    $(".card").hide();
    $("." + previousCard).show();
  });

  $('.race-btn').on('click', function() {
    Gauntlet.player1.name = $('#player-name').val();
  });

  $('.race').on('click', Selectors.chooseRace);

  $(document).on('click', '.playerClass', Selectors.chooseClass);

  $(document).on('click', '.playerClass', Selectors.chooseWeapon);

  // $(document).on('click')

});