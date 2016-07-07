"use strict";

var $ = require('jquery');
const Gauntlet = require('./player');
const Classes = require('./classes');

var domBuild = {};

domBuild.addClassCards = function(classArray) {
  let classCardString = '';
  let colCounter = 0;
  for (let i = 0; i < classArray.length; i++) {
    classCardString += `
    <div class="col-sm-4">
      <div class="card__button">
        <a class="class__link btn btn--big btn--blue playerClass" href="#">
          <span class="btn__prompt">></span>
          <span class="btn__text">${classArray[i]}</span>
        </a>
      </div>
    </div>`;
  }
  $('#classCardInput').empty();
  $('#classCardInput').append(classCardString);
};

domBuild.addAttackCards = function(attackArray) {
  let attackCardString = '';
  for (let i = 0; i < attackArray.length; i++) {
    attackCardString += `
    <div class="col-sm-4">
      <div class="card__button">
        <a class="class__link btn btn--big btn--blue playerAttack" href="#">
          <span class="btn__prompt">></span>
          <span class="btn__text">${attackArray[i]}</span>
        </a>
      </div>
    </div>`;
  }
  $('#attackCardInput').empty();
  $('#attackCardInput').append(attackCardString);
};

module.exports = domBuild;