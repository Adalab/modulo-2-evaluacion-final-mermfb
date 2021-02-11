/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable no-console */
"use strict";

//PAINT SHOWS

function paintShows() {
  list.innerHTML = "";
  for (let show of shows) {
    let isFavoriteClass;
    if (isFavoriteShow(show)) {
      isFavoriteClass = "show--favorite";
    } else {
      isFavoriteClass = "";
    }
    const id = show.show.id;
    const name = show.show.name;
    const listItem = document.createElement("li");
    listItem.setAttribute("class", isFavoriteClass + " " + "js-show");
    listItem.setAttribute("id", id);
    list.appendChild(listItem);
    const itemTitle = document.createElement("h3");
    let titleContent = document.createTextNode(name);
    itemTitle.appendChild(titleContent);
    listItem.appendChild(itemTitle);
    let itemImage = document.createElement("img");
    if (show.show.image === null) {
      itemImage.src = `https://via.placeholder.com/210x295/ffffff/666666/?
        text=TV`;
    } else if (show.show.image.medium === null) {
      itemImage.src = show.show.image.original;
    } else {
      itemImage.src = show.show.image.medium;
    }
    listItem.appendChild(itemImage);
  }

  listenShowsEvents();
}

// compruebo si el show que recibo por parámetro está en los favoritos

function isFavoriteShow(show) {
  const favoriteFound = favorites.find((favorite) => {
    return favorite.show.id === show.show.id;
  });

  if (favoriteFound === undefined) {
    return false;
  } else {
    return true;
  }
}

//PAINT FAVORITES
function paintFavorites() {
  favoritesSectionElement.innerHTML = "";
  const favoritesList = document.createElement("ul");
  const favoritesTitle = document.createElement("h2");
  const sectionTitle = document.createTextNode("Mis series favoritas");
  favoritesTitle.appendChild(sectionTitle);
  favoritesSectionElement.appendChild(favoritesTitle);
  favoritesSectionElement.appendChild(favoritesList);

  for (const favorite of favorites) {
    let isFavoriteClass;
    const id = favorite.show.id;
    const name = favorite.show.name;
    isFavoriteClass = "show--favorite";

    const favoriteItem = document.createElement("li");
    favoriteItem.setAttribute("class", "favoriteItem");
    favoriteItem.setAttribute("id", id);
    favoritesList.appendChild(favoriteItem);

    const favoriteButton = document.createElement("div");
    favoriteButton.setAttribute("class", "favoriteButton");
    favoriteItem.appendChild(favoriteButton);

    const favoriteX = document.createTextNode("X");
    favoriteButton.appendChild(favoriteX);

    const itemTitle = document.createElement("h3");
    let titleContent = document.createTextNode(name);
    itemTitle.setAttribute("class", "favoriteTitle");
    itemTitle.appendChild(titleContent);
    favoriteItem.appendChild(itemTitle);
    let itemImage = document.createElement("img");

    if (favorite.show.image === null) {
      itemImage.src = `https://via.placeholder.com/210x295/ffffff/666666/?
      text=TV`;
    } else if (favorite.show.image.medium === null) {
      itemImage.src = favorite.show.image.original;
    } else {
      itemImage.src = favorite.show.image.medium;
    }
    favoriteItem.appendChild(itemImage);
  }
  listenFavoritesEvents();
}

//FAVORITES

//escuchar shows pintados

function listenShowsEvents() {
  const ShowElements = document.querySelectorAll(".js-show");
  for (let ShowElement of ShowElements) {
    ShowElement.addEventListener("click", handleShow);
  }
  saveInLocalStorage();
}

//escuchar shows favoritos

function listenFavoritesEvents() {
  const FavoriteElements = document.querySelectorAll(".favoriteItem");
  for (let FavoriteElement of FavoriteElements) {
    FavoriteElement.addEventListener("click", handleShow);
  }
  saveInLocalStorage();
}

//COMPROBAR Y METER/QUITAR DE FAVORTIOS
function handleShow(ev) {
  // obtengo el id del clickado
  const clickedShowId = parseInt(ev.currentTarget.id);
  const favoritesFoundIndex = favorites.findIndex(function (favorite) {
    return favorite.show.id === clickedShowId;
  });
  const showFound = shows.find(function (show) {
    return show.show.id === clickedShowId;
  });

  if (favoritesFoundIndex === -1) {
    // busco el show clickado en el array shows
    const showFound = shows.find(function (show) {
      return show.show.id === clickedShowId;
    });

    // para luego añadirlo al array de favoritos
    favorites.push(showFound);
  } else {
    // si el findIndex me ha devuelto un número mayor o igual a 0 es que sí está en el array de favoritos
    favorites.splice(favoritesFoundIndex, 1);
  }
  paintShows();
  paintFavorites();
}
