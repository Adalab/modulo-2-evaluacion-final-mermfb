/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable no-console */
"use strict";

//CONSTANTES
const formElement = document.querySelector(".form");
const inputElement = document.querySelector(".input");
const buttonElement = document.querySelector(".searchButton");
const resultSectionElement = document.querySelector(".resultsection");
const favoritesSectionElement = document.querySelector(".favoritessection");
const resetButton = document.querySelector(".resetButton");
let shows = [];
let favorites = [];
const list = document.createElement("ul");
list.setAttribute("class", "js-showlist");
resultSectionElement.appendChild(list);

//LISTEN EVENTS

buttonElement.addEventListener("click", getDataFromApi);
getFromLocalStorage();
paintFavorites();
resetButton.addEventListener("click", resetFavorites);
