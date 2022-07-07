let mainSearch = document.getElementById("mainsearch");
let appareilSearch = document.getElementById("searchappareil");
let ustensilSearch = document.getElementById("searchustensile");

function addEventSearch() {
  mainSearch.addEventListener("keyup", filterAndRenderResults, false);
  mainSearch.addEventListener("change", filterAndRenderResults, false);
}
