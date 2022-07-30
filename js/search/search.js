let mainSearch = document.getElementById("mainsearch");

function addListenerForMainSearch() {
  mainSearch.addEventListener("keyup", globalRender, false);
  mainSearch.addEventListener("change", globalRender, false);
}

/**
 * filter the recipes
 * @returns filteredRecipes
 */
function getFilterRecipes() {
  let searchTerms = new Array();
  const mainSearchLow = searchableWords(mainSearch.value);

  // Fill searchTerms Array
  if (tags.length > 0) {
    searchTerms.push(...tags);
  }
  if (mainSearch.value.length > 2) {
    searchTerms.push(mainSearchLow);
  }

  let filteredRecipes = new Array();

  if (mainSearch.value.length > 2 || searchTerms.length > 0) {
    recipes.forEach(function callback(element) {
      const allterms = hasAllterms(element, searchTerms);
      if (allterms) {
        filteredRecipes.push(element);
      }
    });
  } else {
    filteredRecipes = [...recipes];
  }
  return filteredRecipes;
}
/**
 * Allow to test if a recipe has all search terms
 * @param {*} element
 * @param {*} searchTerms
 * @returns
 */
function hasAllterms(element, searchTerms) {
  let counterTerms = 0;
  const name = searchableWords(element.name);
  const description = searchableWords(element.description);
  const ingredients = element.ingredients;
  for (let index = 0; index < searchTerms.length; index++) {
    let counterCurrentTerm = 0;
    const currentTerm = searchTerms[index];
    if (name.includes(currentTerm)) {
      if (counterCurrentTerm == 0) {
        counterCurrentTerm++;
        counterTerms++;
      }
    }
    if (description.includes(currentTerm)) {
      if (counterCurrentTerm == 0) {
        counterCurrentTerm++;
        counterTerms++;
      }
    }
    for (let indexIng = 0; indexIng < ingredients.length; indexIng++) {
      const ing = searchableWords(ingredients[indexIng].ingredient);
      if (ing.includes(currentTerm)) {
        if (counterCurrentTerm == 0) {
          counterCurrentTerm++;
          counterTerms++;
        }
      }
    }
  }
  if (counterTerms == searchTerms.length) {
    return true;
  }
  return false;
}

/**
 * Render the filteredRecipes with the Card Class
 */
function renderRecipes() {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";

  let filteredRecipes = getFilterRecipes();

  if (filteredRecipes.length > 0) {
    filteredRecipes.forEach((element) => {
      const cardModel = new Card(element);
      cardsContainer.innerHTML += cardModel.buildCard();
    });
  } else {
    cardsContainer.innerHTML =
      '<div class="p-2 w-100 text-center">Aucune recette ne correspond à vos critères</div>';
  }
}
