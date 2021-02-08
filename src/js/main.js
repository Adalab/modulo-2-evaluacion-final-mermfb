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
      //añadimos llamada a función de pintar
      //
    });
}

//PAINT

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
    const listItem = document.createElement("li");
    list.appendChild(listItem);
    const itemTitle = document.createElement("h3");
    let titleContent = document.createTextNode(show.show.name);
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
}

buttonElement.addEventListener("click", getDataFromApi);
