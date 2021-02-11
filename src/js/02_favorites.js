/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable no-console */
"use strict";

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

//escuchar shows favoritos

function listenFavoritesEvents() {
  const FavoriteElements = document.querySelectorAll(".favoriteItem");
  for (let FavoriteElement of FavoriteElements) {
    FavoriteElement.addEventListener("click", handleShow);
  }
  saveInLocalStorage();
}

//comprobar y meter/quitar de favoritos

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
