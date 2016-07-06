"use strict";

var $ = require('jquery');
const Gauntlet = require('./player');
const Classes = require('./classes');

var domBuild = {};

domBuild.main = function(classArray) {
  let htmlString = '';
  let colCounter = 0;
  for (let i = 0; i < classArray.length; i++) {
    if (colCounter === 0) {
      htmlString += `<div class="col-sm-4">`;
    }
    colCounter++;
    htmlString += `<div class="card__button">
        <a class="class__link btn btn--big btn--blue playerClass" href="#">
          <span class="btn__prompt">></span>
          <span class="btn__text">${classArray[i]}</span>
        </a>
      </div>`;
    if (colCounter === 3 || i + 1 === classArray.length) {
      htmlString += `</div>`;
    }
  }
  $('#input').append(htmlString);
};

module.exports = domBuild;