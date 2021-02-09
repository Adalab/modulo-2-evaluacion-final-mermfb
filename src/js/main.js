"use strict";

//CONSTANTES
const formElement = document.querySelector(".form");
const inputElement = document.querySelector(".input");
const buttonElement = document.querySelector(".button");
let shows = [];
const resultSectionElement = document.querySelector(".resultsection");

//SEARCH

function getDataFromApi() {
  const inputValue = inputElement.value; //no se puede sacar!!!!
  const url = `http://api.tvmaze.com/search/shows?q=${inputValue}`;

  console.log(inputValue);

  event.preventDefault(); //el preventdefault tiene que estar aquí? Por qué?
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      shows = data;
      console.log(shows);
      paintShows();
    });
}

//PAINT  //FALTA COMPROBAR FAVORITOS

//constante para estructura //innerHTML o DOMavanzado
//(crear ul con lis dentro de la section) (el ul solo una vez, el li tantas como resultados)
//h3 para el titulo e imagen
const list = document.createElement("ul");
resultSectionElement.appendChild(list);

function paintShows() {
  list.innerHTML = ""; //REVISAR mezclando DOM avanzado con innerHTML!!!

  //   for (let child of list.children) {
  //     if (child.tagName === "LI") {
  //       list.removeChild(child);
  //     }
  //   }

  for (let show of shows) {
    const id = show.show.id;
    const name = show.show.name;
    const listItem = document.createElement("li");
    listItem.setAttribute("class", "js-show");
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
  listenShowsEvents();
}

//escuchar shows pintados

//FAVORITES

let favorites = [
  {
    externals: { tvrage: null, thetvdb: 357527, imdb: "tt7555294" },
    genres: (3)[("Drama", "Action", "Crime")],
    id: 38565,
    image: {
      medium:
        "http://static.tvmaze.com/uploads/images/medium_portrait/260/650446.jpg",
      original:
        "http://static.tvmaze.com/uploads/images/original_untouched/260/650446.jpg",
    },
    language: "English",
    name: "L.A.'s Finest",
  },
];

function listenShowsEvents() {
  const ShowElements = document.querySelectorAll(".js-show");
  console.log(ShowElements);
  for (let ShowElement of ShowElements) {
    ShowElement.addEventListener("click", handleShow);
  }
  saveInLocalStorage();
  getFromLocalStorage();
}

// está función comprueba si la paleta clickada está dentro de favoritos
// - Si está lo debo sacar del array de favoritos
// - Si no está lo debo añadir al array de favoritos
function handleShow(ev) {
  // obtengo el id de la paleta clickada
  const clickedShowId = ev.currentTarget.id;
  //   const favoritesFoundIndex = favorites.findIndex(function (favorite) {
  //     return favorite.id === clickedShowId;
  //   });
  //   console.log("id del show clickado", clickedShowId);
  //   const showFound = shows.find(function (show) {
  //     return show.show.id === clickedShowId;
  //   });
  //   // para luego añadirlo al array de favoritos
  //   favorites.push(showFound);
  console.log(favorites);
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
console.log(favorites);

buttonElement.addEventListener("click", getDataFromApi);
