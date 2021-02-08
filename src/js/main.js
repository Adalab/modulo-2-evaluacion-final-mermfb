"use strict";

//CONSTANTES
const formElement = document.querySelector(".form");
const inputElement = document.querySelector(".input");
const buttonElement = document.querySelector(".button");
let shows = [];

//SEARCH

function getDataFromApi() {
  const inputValue = inputElement.value;
  const url = `http://api.tvmaze.com/search/shows?q=${inputValue}`;

  console.log(inputValue);

  event.preventDefault(); //el preventdefault tiene que estar aquí? Por qué?
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      shows = data;
      console.log(shows);
      //añadimos llamada a función de pintar
      //
    });
}

//PAINT

//constante para estructura //innerHTML o DOMavanzado

buttonElement.addEventListener("click", getDataFromApi);
