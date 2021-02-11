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

//escuchar shows pintados

function listenShowsEvents() {
  const ShowElements = document.querySelectorAll(".js-show");
  for (let ShowElement of ShowElements) {
    ShowElement.addEventListener("click", handleShow);
  }
  saveInLocalStorage();
}
