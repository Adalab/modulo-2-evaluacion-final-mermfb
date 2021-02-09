/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable no-console */
"use strict";

//CONSTANTES
const formElement = document.querySelector(".form");
const inputElement = document.querySelector(".input");
const buttonElement = document.querySelector(".button");
const resultSectionElement = document.querySelector(".resultsection");
let shows = [];
let favorites = [
  {
    score: 17.7553,
    show: {
      id: 139,
      url: "http://www.tvmaze.com/shows/139/girls",
      name: "Girls",
      type: "Scripted",
      language: "English",
      genres: ["Drama", "Romance"],
      status: "Ended",
      runtime: 30,
      premiered: "2012-04-15",
      officialSite: "http://www.hbo.com/girls",
      schedule: { time: "22:00", days: ["Sunday"] },
      rating: { average: 6.8 },
      weight: 92,
      network: {
        id: 8,
        name: "HBO",
        country: {
          name: "United States",
          code: "US",
          timezone: "America/New_York",
        },
      },
      webChannel: null,
      externals: { tvrage: 30124, thetvdb: 220411, imdb: "tt1723816" },
      image: {
        medium:
          "http://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg",
        original:
          "http://static.tvmaze.com/uploads/images/original_untouched/31/78286.jpg",
      },
      summary:
        "<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>",
      updated: 1611310521,
      _links: {
        self: { href: "http://api.tvmaze.com/shows/139" },
        previousepisode: { href: "http://api.tvmaze.com/episodes/1079686" },
      },
    },
  },
];

//SEARCH

function getDataFromApi() {
  const inputValue = inputElement.value; //no se puede sacar!!!!
  const url = `http://api.tvmaze.com/search/shows?q=${inputValue}`;

  event.preventDefault(); //el preventdefault tiene que estar aquí? Por qué?
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      shows = data;
      console.log(shows);
      paintShows();
    });
}

//PAINT

const list = document.createElement("ul");
list.setAttribute("class", "js-showlist");
resultSectionElement.appendChild(list);

function paintShows() {
  list.innerHTML = ""; //REVISAR mezclando DOM avanzado con innerHTML!!!

  //   for (let child of list.children) {
  //     if (child.tagName === "LI") {
  //       list.removeChild(child);
  //     }
  //   }

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
    listItem.setAttribute("class", isFavoriteClass);
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

    console.log(listItem);
  }
  listenShowsEvents(); //llamamos siempre después de pintar
}

function isFavoriteShow(show) {
  // compruebo si la paleta que recibo por parámetro está en los favoritos
  const favoriteFound = favorites.find((favorite) => {
    // la dificultad de esta función interna del find es saber que tengo que comparar
    // yo consolearía console.log(favorite, palette) para ver los datos que debo comparar
    return favorite.show.id === show.show.id;
  });
  // find devuelve undefined si no lo encuentra
  // retorno si está o no está en favoritos
  if (favoriteFound === undefined) {
    return false;
  } else {
    return true;
  }
}

//FAVORITES

//escuchar shows pintados

function listenShowsEvents() {
  const ShowElements = document.querySelectorAll(".js-show");
  console.log(ShowElements);
  for (let ShowElement of ShowElements) {
    ShowElement.addEventListener("click", handleShow);
  }
  // saveInLocalStorage();
  // getFromLocalStorage();
}

// está función comprueba si la paleta clickada está dentro de favoritos
// - Si está lo debo sacar del array de favoritos
// - Si no está lo debo añadir al array de favoritos
function handleShow(ev) {
  // obtengo el id de la paleta clickada
  const clickedShowId = ev.currentTarget.id;
  const favoritesFoundIndex = favorites.findIndex(function (favorite) {
    return favorite.id === clickedShowId;
  });
  console.log("id del show clickado", clickedShowId);
  const showFound = shows.find(function (show) {
    return show.show.id === clickedShowId;
  });
  // para luego añadirlo al array de favoritos
  favorites.push(showFound);
  console.log("Mis favoritas", favorites);
  paintShows();
}

//LOCAL STORAGE

function saveInLocalStorage() {
  const stringFavorites = JSON.stringify(favorites);
  localStorage.setItem("favorites", stringFavorites);
  console.log(stringFavorites);
}

function getFromLocalStorage() {
  const localStorageFavorites = localStorage.getItem("favorites");
  // siempre que cojo datos del local storage tengo que comprobar si son válidos
  // es decir si es la primera vez que entro en la página
  if (localStorageFavorites !== null) {
    const arrayFavorites = JSON.parse(localStorageFavorites);
    // lo guardo en la variable global de palettes
    favorites = arrayFavorites;
    // cada vez que modifico los arrays de palettes o de favorites vuelvo a pintar y a escuchar eventos
    paintShows();
    console.log(favorites);
  }
}
console.log("Mis favoritas", favorites);

buttonElement.addEventListener("click", getDataFromApi);
