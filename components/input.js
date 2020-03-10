import { findMovie } from "./../Api";
import HomePage from "./../scenes/HomePage";
import MoviePage from "./../scenes/MoviePage";

let timer;
let currentList;

export function searchMovie(e) {
  const value = document.getElementById("searchInput").value;
  if (value === "") {
    HomePage();
    return;
  }
  let elem = document.getElementById("scene_position");
  elem.innerHTML = "Loading...";
  clearTimeout(timer);
  timer = setTimeout(
    async () =>
      await findMovie(value)
        .then(res => res.json())
        .then(res => {
          let elem = document.getElementById("scene_position");
          let context = "";
          currentList = res.results;
          if (!res.results || res.results.length === 0) {
            elem.innerHTML = "None results....";
          } else {
            res.results.map(
              item =>
                (context += `<li><a href="${item.id}" id="${item.id}">${
                  item.title
                }</a></li>`)
            );
            elem.innerHTML = context;
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
        }),
    1000
  );
}
