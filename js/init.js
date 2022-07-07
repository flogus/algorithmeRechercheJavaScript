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

function filterRecipes() {
  const searchTerms = new Array();
  const searchValue = searchableWords(mainSearch.value);

  // Fill searchTerms Array
  if (tags.length > 0) {
    searchTerms.push(...tags);
  }
  if (mainSearch.value.length > 2) {
    searchTerms.push(mainSearch.value);
  }

  if (mainSearch.value.length > 2 || searchTerms.length > 0) {
    filteredRecipes = [];
    recipes.forEach(function callback(element) {
      searchTerms.forEach(function callback(term) {
        const nameValue = searchableWords(element.name);
        const descriptionValue = searchableWords(element.description);

        if (nameValue.search(term) != -1) {
          if (!filteredRecipes.includes(element)) {
            filteredRecipes.push(element);
          }
        }
        if (descriptionValue.search(term) != -1) {
          if (!filteredRecipes.includes(element)) {
            filteredRecipes.push(element);
          }
        }

        element.ingredients.forEach((elementIng) => {
          const ingredientsValue = searchableWords(elementIng.ingredient);
          if (ingredientsValue.search(term) != -1) {
            if (!filteredRecipes.includes(element)) {
              filteredRecipes.push(element);
            }
          }
        });
      });
    });

    // Search tags
    /*if (tags.length > 0) {
      recipes.forEach(function callback(element, index) {
        const nameValue = searchableWords(element.name);
        const descriptionValue = searchableWords(element.description);

        tags.forEach(function callback(tag) {
          if (nameValue.includes(tag)) {
            if (!filteredRecipes.includes(element)) {
              filteredRecipes.push(element);
            }
          }
          if (descriptionValue.includes(tag)) {
            if (!filteredRecipes.includes(element)) {
              filteredRecipes.push(element);
            }
          }
          element.ingredients.forEach((elementIng) => {
            const ingredientsValue = searchableWords(elementIng.ingredient);
            if (ingredientsValue.search(searchValue) != -1) {
              if (!filteredRecipes.includes(element)) {
                filteredRecipes.push(element);
              }
            }
          });
        });
      });
    }*/
  } else {
    filteredRecipes = [...recipes];
  }
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
  filteredRecipes.forEach((element) => {
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
