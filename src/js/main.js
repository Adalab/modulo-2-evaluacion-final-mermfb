/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable no-console */
"use strict";

//CONSTANTES
const formElement = document.querySelector(".form");
const inputElement = document.querySelector(".input");
const buttonElement = document.querySelector(".button");
const resultSectionElement = document.querySelector(".resultsection");
const favoritesSectionElement = document.querySelector(".favoritessection");
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
  {
    score: 13.419667,
    show: {
      id: 722,
      url: "http://www.tvmaze.com/shows/722/the-golden-girls",
      name: "The Golden Girls",
      type: "Scripted",
      language: "English",
      genres: ["Drama", "Comedy"],
      status: "Ended",
      runtime: 30,
      premiered: "1985-09-14",
      officialSite: null,
      schedule: { time: "21:00", days: ["Saturday"] },
      rating: { average: 8.4 },
      weight: 94,
      network: {
        id: 1,
        name: "NBC",
        country: {
          name: "United States",
          code: "US",
          timezone: "America/New_York",
        },
      },
      webChannel: null,
      externals: { tvrage: 5820, thetvdb: 71292, imdb: "tt0088526" },
      image: {
        medium:
          "http://static.tvmaze.com/uploads/images/medium_portrait/6/15097.jpg",
        original:
          "http://static.tvmaze.com/uploads/images/original_untouched/6/15097.jpg",
      },
      summary:
        "<p><b>The Golden Girls</b> follows four South Florida seniors sharing a house, their dreams, and a whole lot of cheesecake. Bright, promiscuous, clueless, and hilarious, these lovely mismatched ladies form the perfect circle of friends.</p>",
      updated: 1610225849,
      _links: {
        self: { href: "http://api.tvmaze.com/shows/722" },
        previousepisode: { href: "http://api.tvmaze.com/episodes/64040" },
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

//PAINT FAVORITES
function paintFavorites() {
  favoritesSectionElement.innerHTML = "";
  const favoritesList = document.createElement("ul");
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
    const itemTitle = document.createElement("h3");
    let titleContent = document.createTextNode(name);
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
}

//más adelante habrá que escuchar las paletas o el botón X para sacar de favoritos

//PAINT SHOWS

const list = document.createElement("ul");
list.setAttribute("class", "js-showlist");
resultSectionElement.appendChild(list);

function paintShows() {
  list.innerHTML = ""; //REVISAR mezclando DOM avanzado con innerHTML!!!
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

    console.log(listItem);
  }
  listenShowsEvents(); //llamamos siempre después de pintar
}

function isFavoriteShow(show) {
  // compruebo si el show que recibo por parámetro está en los favoritos
  const favoriteFound = favorites.find((favorite) => {
    console.log("dentro del find", show.show.id);
    // la dificultad de esta función interna del find es saber que tengo que comparar
    // yo consolearía console.log(favorite, palette) para ver los datos que debo comparar
    console.log("favorite", favorite, "show", show);

    return favorite.show.id === show.show.id;
  });

  console.log("show encontrado", favoriteFound, show.show.id);
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
  saveInLocalStorage();
}

//comprobar si el show está en favoritos, si no meterlo
function handleShow(ev) {
  // obtengo el id del clickado
  const clickedShowId = parseInt(ev.currentTarget.id);
  console.log("id del show clickado", clickedShowId);
  const favoritesFoundIndex = favorites.findIndex(function (favorite) {
    return favorite.show.id === clickedShowId;
  });
  const showFound = shows.find(function (show) {
    return show.show.id === clickedShowId;
  });

  if (favoritesFoundIndex === -1) {
    // busco la paleta clickada en el array de paletas
    const showFound = shows.find(function (show) {
      return show.show.id === clickedShowId;
    });

    console.log(showFound);
    // para luego añadirlo al array de favoritos
    favorites.push(showFound);
    console.log("Mis favoritas", favorites);
  } else {
    // si el findIndex me ha devuelto un número mayor o igual a 0 es que sí está en el array de favoritos
    // quiero sacarlo de array de favoritos
    // para utilizar splice necesito el índice del elemento que quiero borrar
    // y quiero borrar un solo elemento
    favorites.splice(favoritesFoundIndex, 1);
  }
  paintShows();
  paintFavorites();
}

//LOCAL STORAGE

function saveInLocalStorage() {
  const stringFavorites = JSON.stringify(favorites);
  localStorage.setItem("favorites", stringFavorites);
}

function getFromLocalStorage() {
  const localStorageFavorites = localStorage.getItem("favorites");
  // siempre que cojo datos del local storage tengo que comprobar si son válidos
  // es decir si es la primera vez que entro en la página
  if (localStorageFavorites !== null) {
    const arrayFavorites = JSON.parse(localStorageFavorites);
    favorites = arrayFavorites;
    // cada vez que modifico el array favorites vuelvo a pintar y a escuchar eventos
    paintShows();
    console.log(favorites);
  }
}
console.log("Mis favoritas", favorites);

buttonElement.addEventListener("click", getDataFromApi);
getFromLocalStorage();
paintFavorites();
