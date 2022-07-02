let ingredientsFiltered = new Array();
let applianceFiltered = new Array();
let ustensilsFiltered = new Array();
let tags = new Array();
let results = new Array();
let filteredRecipes = new Array();
let totalFind = 0;

function filterRecipes() {
  console.clear();
  const searchValue = mainSearch.value.toLowerCase();
  console.log(">>> SEARCHING :", searchValue);

  if (mainSearch.value.length > 2) {
    filteredRecipes = [];
    recipes.forEach(function callback(element, index) {
      const nameValue = element.name.toLowerCase();
      const descriptionValue = element.description.toLowerCase();

      if (nameValue.search(searchValue) != -1) {
        if (!filteredRecipes.includes(element)) {
          filteredRecipes.push(element);
        }
      }
      if (descriptionValue.search(searchValue) != -1) {
        if (!filteredRecipes.includes(element)) {
          filteredRecipes.push(element);
        }
      }

      element.ingredients.forEach((elementIng) => {
        const ingredientsValue = elementIng.ingredient.toLowerCase();
        if (ingredientsValue.search(searchValue) != -1) {
          if (!filteredRecipes.includes(element)) {
            filteredRecipes.push(element);
          }
        }
      });
    });
  } else {
    filteredRecipes = [...recipes];
  }

  console.log("filteredRecipes :", filteredRecipes);
}

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
function renderRecipes() {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";
  filteredRecipes.forEach((element, index) => {
    const cardModel = new Card(element);
    cardsContainer.innerHTML += cardModel.buildCard();
  });
  setTotalRecipes();
}

function filterAndRenderResults() {
  filterRecipes();
  renderRecipes();
}

async function init() {
  filterAndRenderDropdowns();
  filterAndRenderResults();
  doFocus();
  addEventSearch();
  addListenerForTags();
}
init();
