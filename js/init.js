let ingredientList = new Array();
let ingredientListLow = new Array();
let appareilList = new Array();
let appareilListLow = new Array();
let ustensileList = new Array();
let ustensileListLow = new Array();
let tags = new Array();
let results = new Array();
let filteredRecipes = new Array();
let totalFind = 0;

function setTotalRecipes() {
  document.getElementById("totalFind").innerHTML = "";
  if (filteredRecipes.length > 1) {
    document.getElementById("totalFind").innerHTML =
      filteredRecipes.length + " recettes";
  } else {
    document.getElementById("totalFind").innerHTML =
      filteredRecipes.length + " recette";
  }
}

async function init() {
  filterAndRenderDropdowns();
  filterAndRenderResults();
  doFocus();
  addEventSearch();
  addListenerForTags();
}
init();
