import { fetchTrending } from "./../Api";
import { searchMovie } from "./../components/input";
import MoviePage from "./MoviePage";

let input;
let currentList;
async function renderHomePage() {
  await fetchTrending()
    .then(res => res.json())
    .then(res => {
      let elem = document.getElementById("scene_position");
      let context = "";
      currentList = res.results;
      res.results.map(
        item =>
          (context += `<li><a href="${item.id}" id="${item.id}">${
            item.title
          }</a></li>`)
      );
      elem.innerHTML = context;
    })
    .catch(err => {
      document.getElementById(
        "scene_position"
      ).innerHTML = `<div>Error...</div>`;
    });
  input = document.getElementById("searchButton");
  if (input) input.onclick = searchMovie;
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

function HomePage() {
  renderHomePage();
  return `<div id="scene_position">Loading....</div>`;
}

export default HomePage;
