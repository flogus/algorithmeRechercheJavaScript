let dropDowns = new Array("Ingrédient", "Appareil", "Ustensile");
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
  const currentRecipes = getfilterRecipes();
  if (currentRecipes.length > 1) {
    document.getElementById("totalFind").innerHTML =
      currentRecipes.length + " recettes";
  } else {
    document.getElementById("totalFind").innerHTML =
      currentRecipes.length + " recette";
  }
}

async function init() {
  filterAndRenderDropdowns();
  filterAndRenderResults();
  doFocus();
  addListenerForMainSearch();
  addListenerForTags();
}
init();
