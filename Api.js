const url = "https://api.themoviedb.org/3";
const api_key = "?api_key=821da42809bdc2311d1dce45bc01d36b";

export async function fetchTrending() {
  return await fetch(url + "/trending/movie/week" + api_key);
}
export async function findMovie(query) {
  return await fetch(url + "/search/movie" + api_key + `&query=${query}`);
}
export async function fetchRecomendations(movie_id) {
  return await fetch(url + `/movie/${movie_id}/recommendations` + api_key);
}
