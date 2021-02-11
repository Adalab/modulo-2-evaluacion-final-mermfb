/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable no-console */
"use strict";

//SEARCH

function getDataFromApi() {
  event.preventDefault();
  const inputValue = inputElement.value;
  const url = `//api.tvmaze.com/search/shows?q=${inputValue}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      shows = data;
      paintShows();
    });
}
