let dropDowns = new Array("Ingrédient", "Appareil", "Ustensile");
let tags = new Array();
let results = new Array();

function setTotalRecipes() {
  const totalFindId = document.getElementById("totalFind");
  totalFindId.innerHTML = "";
  const currentRecipes = getFilterRecipes();
  if (currentRecipes.length > 1) {
    totalFindId.innerHTML = currentRecipes.length + " recettes";
  } else {
    totalFindId.innerHTML = currentRecipes.length + " recette";
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
