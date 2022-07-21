let mainSearch = document.getElementById("mainsearch");

function addListenerForMainSearch() {
  mainSearch.addEventListener("keyup", filterAndRenderResults, false);
  mainSearch.addEventListener("change", filterAndRenderResults, false);
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
  return filteredRecipes;
}

function updateDropdowns() {
  const filteredRecipes = getFilterRecipes();

  // Get the three search input
  const ids = document.querySelectorAll("#dropdowns-container input");

  const seaBoxVal = searchableWords(
    document.getElementById("mainsearch").value
  );

  // Loop on the searchboxes and add new data
  ids.forEach((element, index) => {
    const tempList = new Array();
    const currentList = getFilterDropDowns()[index];
    console.log("updateDropdowns > currentList", currentList);

    if (seaBoxVal.length > 2) {
      currentList.forEach((element) => {
        let elem = searchableWords(element);

        if (elem.includes(seaBoxVal)) {
          console.log("ELEM", elem, seaBoxVal);
          // allez chercher dans toutes les recettes et pour chaques type
          console.log("filteredRecipes", typeof filteredRecipes);

          recipes.forEach(function (recipe) {
            Object.entries(recipe).forEach((entry) => {
              const [key, value] = entry;
              // console.log(key, value);
              if (key == "ingredients" && index == 0) {
                value.forEach(function (ingredients) {
                  let currentIng = searchableWords(ingredients.ingredient);
                  // if found once add all ingredients

                  console.log("currentIng ", currentIng);
                  if (currentIng.includes(elem)) {
                    console.log("FOUND ", currentIng, elem);

                    value.forEach(function (ingredients) {
                      console.log("Value ", value);
                      if (!tempList.includes(currentIng)) {
                        console.log(
                          "Add ",
                          tempList,
                          currentIng,
                          ingredients.ingredient
                        );
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
  updateDropdowns();
  setTotalRecipes();
  addListenerForTags();
}

function filterAndRenderResults() {
  getFilterRecipes();
  renderRecipes();
}
