let mainSearch = document.getElementById("mainsearch");

function addListenerForMainSearch() {
  mainSearch.addEventListener("keyup", filterAndRenderResults, false);
  mainSearch.addEventListener("change", filterAndRenderResults, false);
}

/**
 * filter the recipes
 */
function filterRecipes() {
  const searchTerms = new Array();

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
  } else {
    filteredRecipes = [...recipes];
  }
}

/**
 * Render the filteredRecipes with the Card Class
 */
function renderRecipes() {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";
  if (filteredRecipes.length > 0) {
    filteredRecipes.forEach((element) => {
      const cardModel = new Card(element);
      cardsContainer.innerHTML += cardModel.buildCard();
    });
  } else {
    cardsContainer.innerHTML =
      '<div class="p-2 w-100 text-center">Aucune recette ne correspond à vos critères</div>';
  }
  setTotalRecipes();
}

function filterAndRenderResults() {
  filterRecipes();
  renderRecipes();
}
