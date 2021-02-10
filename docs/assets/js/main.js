"use strict";const formElement=document.querySelector(".form"),inputElement=document.querySelector(".input"),buttonElement=document.querySelector(".button"),resultSectionElement=document.querySelector(".resultsection"),favoritesSectionElement=document.querySelector(".favoritessection");let shows=[],favorites=[{score:17.7553,show:{id:139,url:"http://www.tvmaze.com/shows/139/girls",name:"Girls",type:"Scripted",language:"English",genres:["Drama","Romance"],status:"Ended",runtime:30,premiered:"2012-04-15",officialSite:"http://www.hbo.com/girls",schedule:{time:"22:00",days:["Sunday"]},rating:{average:6.8},weight:92,network:{id:8,name:"HBO",country:{name:"United States",code:"US",timezone:"America/New_York"}},webChannel:null,externals:{tvrage:30124,thetvdb:220411,imdb:"tt1723816"},image:{medium:"http://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg",original:"http://static.tvmaze.com/uploads/images/original_untouched/31/78286.jpg"},summary:"<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>",updated:1611310521,_links:{self:{href:"http://api.tvmaze.com/shows/139"},previousepisode:{href:"http://api.tvmaze.com/episodes/1079686"}}}},{score:13.419667,show:{id:722,url:"http://www.tvmaze.com/shows/722/the-golden-girls",name:"The Golden Girls",type:"Scripted",language:"English",genres:["Drama","Comedy"],status:"Ended",runtime:30,premiered:"1985-09-14",officialSite:null,schedule:{time:"21:00",days:["Saturday"]},rating:{average:8.4},weight:94,network:{id:1,name:"NBC",country:{name:"United States",code:"US",timezone:"America/New_York"}},webChannel:null,externals:{tvrage:5820,thetvdb:71292,imdb:"tt0088526"},image:{medium:"http://static.tvmaze.com/uploads/images/medium_portrait/6/15097.jpg",original:"http://static.tvmaze.com/uploads/images/original_untouched/6/15097.jpg"},summary:"<p><b>The Golden Girls</b> follows four South Florida seniors sharing a house, their dreams, and a whole lot of cheesecake. Bright, promiscuous, clueless, and hilarious, these lovely mismatched ladies form the perfect circle of friends.</p>",updated:1610225849,_links:{self:{href:"http://api.tvmaze.com/shows/722"},previousepisode:{href:"http://api.tvmaze.com/episodes/64040"}}}}];function getDataFromApi(){const e="http://api.tvmaze.com/search/shows?q="+inputElement.value;event.preventDefault(),fetch(e).then(e=>e.json()).then(e=>{shows=e,console.log(shows),paintShows()})}function paintFavorites(){const e=document.createElement("ul");favoritesSectionElement.appendChild(e);for(const t of favorites){let o;const s=t.show.id,i=t.show.name;o="show--favorite";const n=document.createElement("li");n.setAttribute("class","favoriteItem"),n.setAttribute("id",s),e.appendChild(n);const a=document.createElement("h3");let l=document.createTextNode(i);a.appendChild(l),n.appendChild(a);let r=document.createElement("img");null===t.show.image?r.src="https://via.placeholder.com/210x295/ffffff/666666/?\n      text=TV":null===t.show.image.medium?r.src=t.show.image.original:r.src=t.show.image.medium,n.appendChild(r)}}const list=document.createElement("ul");function paintShows(){list.innerHTML="";for(let e of shows){let t;isFavoriteShow(e)&&(t="show--favorite");const o=e.show.id,s=e.show.name,i=document.createElement("li");i.setAttribute("class",t+" js-show"),i.setAttribute("id",o),list.appendChild(i);const n=document.createElement("h3");let a=document.createTextNode(s);n.appendChild(a),i.appendChild(n);let l=document.createElement("img");null===e.show.image?l.src="https://via.placeholder.com/210x295/ffffff/666666/?\n        text=TV":null===e.show.image.medium?l.src=e.show.image.original:l.src=e.show.image.medium,i.appendChild(l),console.log(i)}listenShowsEvents()}function isFavoriteShow(e){const t=favorites.find(t=>(console.log("dentro del find",e.show.id),console.log("favorite",t,"show",e),t.show.id===e.show.id));return console.log("show encontrado",t,e.show.id),void 0!==t}function listenShowsEvents(){const e=document.querySelectorAll(".js-show");console.log(e);for(let t of e)t.addEventListener("click",handleShow);saveInLocalStorage()}function handleShow(e){const t=e.currentTarget.id;console.log("id del show clickado",t),console.log(favorites.id);favorites.findIndex((function(e){return e.show.id===t}));const o=shows.find((function(e){return e.show.id===t}));console.log(o),favorites.push(o),console.log("Mis favoritas",favorites),paintShows()}function saveInLocalStorage(){const e=JSON.stringify(favorites);localStorage.setItem("favorites",e),console.log(e)}function getFromLocalStorage(){const e=localStorage.getItem("favorites");if(null!==e){const t=JSON.parse(e);favorites=t,paintShows(),console.log(favorites)}}list.setAttribute("class","js-showlist"),resultSectionElement.appendChild(list),console.log("Mis favoritas",favorites),buttonElement.addEventListener("click",getDataFromApi),getFromLocalStorage(),paintFavorites();