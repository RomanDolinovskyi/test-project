import { fetchRecomendations } from "./../Api";

let currentList;

async function addRecomendations(id) {
  await fetchRecomendations(id)
    .then(res => res.json())
    .then(res => {
      let elem = document.getElementById("recomended_movies");
      let context = "";
      currentList = res.results;
      res.results.map(
        item =>
          (context += `<li><a href="${item.id}" id="${item.id}">${
            item.title
          }</a></li>`)
      );
      elem.innerHTML = context;
    });
  let items = document.getElementsByTagName("a");
  let keys = Object.keys(items);
  keys.map(
    key =>
      (items[key].onclick = e => {
        e.preventDefault();
        return MoviePage(e.target.id, currentList);
      })
  );
}

function renderMoviePage(id, list) {
  let arrList = list.filter(item => item.id === +id);
  let movie = arrList[0];

  document.getElementById("scene_position").innerHTML = `
  
    <img src="http://image.tmdb.org/t/p/w300/${movie.poster_path}">
    <h1>${movie.title}</h1>
    <p>${movie.overview}</p>
    <h4>Recomendations<h4>
    <div id="recomended_movies">Loading...</div>

  `;

  addRecomendations(id);
}

function MoviePage(id, list) {
  renderMoviePage(id, list);
}

export default MoviePage;
