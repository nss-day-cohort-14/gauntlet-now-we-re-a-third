'use strict';
const Gauntlet = require('./player');
const Enemies = require('./enemies');
const Classes = require('./classes');
const Weapons = require('./weapons');
const Spells = require('./spells');
const Selectors = require('./selectors');
const Reset = require('./reset');
const Battleground = require('./battleground');
var $ = require('jquery');

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
      case "card--battleground":
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

  //grabs player name from input box
  $('.race-btn').on('click', function() {
    Gauntlet.player1.name = $('#player-name').val();
  });
  //listens for click event on either race card to run chooseRace function
  $('.race').on('click', Selectors.chooseRace);
  //listens for click event on any class card to run chooseClass function
  $(document).on('click', '.playerClass', Selectors.chooseClass);
  //listens for click event on any class card to run chooseWeapon function
  $(document).on('click', '.playerClass', Selectors.chooseWeapon);
  //listens for click event on any attack card to run addAttacks function
  $(document).on('click', '.playerAttack', Selectors.addAttacks);
  //listens for click event on defeat enemies button to run buildPlayerObject function
  $('.defeatEnemies').on('click', Selectors.buildPlayerObject);
  //listens for click event on restart button to run reset function
  $('.restart').on('click', Reset);
  //listens for click event on attack button to run battleground logic
  $('.attackBtn').on('click', Battleground);

});