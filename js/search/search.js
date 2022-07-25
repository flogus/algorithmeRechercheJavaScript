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

  // Fill searchTerms Array
  if (tags.length > 0) {
    searchTerms.push(...tags);
  }
  if (mainSearch.value.length > 2) {
    searchTerms.push(mainSearch.value);
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
  console.log(filteredRecipes);
  return filteredRecipes;
}
/**
 * Allow to test if a recipe has all search terms
 * @param {*} element
 * @param {*} searchTerms
 * @returns
 */
function hasAllterms(element, searchTerms) {
  const counterTermsValid = new Array();
  let counterTerms = 0;
  // console.group("hasAllterms");
  // console.log(element, searchTerms);
  const name = searchableWords(element.name);
  const description = searchableWords(element.description);
  const ingredients = element.ingredients;
  // console.log("name", name);
  // console.log("description", description);
  // console.log("ingredients", ingredients);
  for (let index = 0; index < searchTerms.length; index++) {
    let counterCurrentTerm = 0;
    const currentTerm = searchTerms[index];
    if (name.includes(currentTerm)) {
      counterTermsValid.push({ name: currentTerm });
      if (counterCurrentTerm == 0) {
        counterCurrentTerm++;
        counterTerms++;
      }
    }
    if (description.includes(currentTerm)) {
      counterTermsValid.push({ description: currentTerm });
      if (counterCurrentTerm == 0) {
        counterCurrentTerm++;
        counterTerms++;
      }
    }
    for (let indexIng = 0; indexIng < ingredients.length; indexIng++) {
      const ing = searchableWords(ingredients[indexIng].ingredient);
      if (ing.includes(currentTerm)) {
        counterTermsValid.push({ ingredient: currentTerm });
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
  // console.log(counterTermsValid, counterTerms);
  // console.groupEnd();
  return false;
}

/**
 * Update the dropdowns when searching in the main searchbox
 * It will update every dropdowns using the setMenu() from the Dropdown Class
 */
function updateDropdowns() {
  const filteredRecipes = getFilterRecipes();

  // Get the three search input
  const ids = document.querySelectorAll("#dropdowns-container input");

  // Get the searchbox value
  const seaBoxVal = searchableWords(
    document.getElementById("mainsearch").value
  );

  // Loop on the searchboxes and add new data
  ids.forEach((element, index) => {
    const tempList = new Array();
    const currentList = getFilterDropDowns()[index];
    // console.log("updateDropdowns > currentList", currentList);

    // If the searchbox value is more than 2, do the search
    if (seaBoxVal.length > 2) {
      currentList.forEach((element) => {
        let elem = searchableWords(element);

        // If the searchbox value is include in the current element
        if (elem.includes(seaBoxVal)) {
          // For every recipes
          recipes.forEach(function (recipe) {
            Object.entries(recipe).forEach((entry) => {
              const [key, value] = entry;
              // console.log(key, value);
              if (key == "ingredients" && index == 0) {
                value.forEach(function (ingredients) {
                  let currentIng = searchableWords(ingredients.ingredient);
                  // console.log("currentIng ", currentIng);

                  // if found once add all ingredients
                  if (currentIng.includes(elem)) {
                    // console.log("FOUND ", currentIng, elem);

                    value.forEach(function (ingredients) {
                      // console.log("Value ", value);
                      if (!tempList.includes(currentIng)) {
                        // console.log(
                        //   "Add ",
                        //   tempList,
                        //   currentIng,
                        //   ingredients.ingredient
                        // );
                        tempList.push(ingredients.ingredient);
                      }
                    });
                  }
                });
              }
            });
          });
          if (!tempList.includes(elem)) {
            tempList.push(elem);
          }
        }
      });
      dropDownObj[index].setMenu(tempList);
    } else {
      dropDownObj[index].setMenu(currentList);
    }
  });
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
