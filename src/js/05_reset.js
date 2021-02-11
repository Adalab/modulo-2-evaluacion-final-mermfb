/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable no-console */
"use strict";

//RESET FAVORITOS
function resetFavorites() {
  favorites = [];
  paintShows();
  paintFavorites();
  saveInLocalStorage();
}
