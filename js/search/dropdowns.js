function renderDropDownIng() {
  const dropDownMenuIngredient = new DropDown("Ingrédients", ingredientsList);
  document.getElementById("dropDownMenu-ingredient").innerHTML =
    dropDownMenuIngredient.buildMenu();
}

/**
 * filter the recipes for the three dropdowns
 */
async function filterDropdowns() {
  recipes.forEach(function (element) {
    let lesIngredients = element.ingredients;
    lesIngredients.forEach(function (ingredients) {
      if (!ingredientList.includes(ingredients.ingredient)) {
        ingredientList.push(ingredients.ingredient);
        ingredientListLow.push(searchableWords(ingredients.ingredient));
      }
    });
    if (!appareilList.includes(element.appliance)) {
      appareilList.push(element.appliance);
      appareilListLow.push(searchableWords(element.appliance));
    }
    let lesUstensiles = element.ustensils;
    lesUstensiles.forEach(function (lesUstensiles) {
      if (!ustensileList.includes(lesUstensiles)) {
        ustensileList.push(lesUstensiles);
        ustensileListLow.push(searchableWords(lesUstensiles));
      }
    });
  });
  /*
    console.groupCollapsed("ingredientsList");
    console.log(ingredientsList);
    console.groupEnd();
    console.groupCollapsed("appareilList");
    console.log(appareilList);
    console.groupEnd();
    console.groupCollapsed("ustensilesList");
    console.log(ustensilesList);
    console.groupEnd();
    */
}

async function renderDropDowns() {
  const dropDownsContainer = document.getElementById("dropdowns-container");
  dropDownsContainer.innerHTML = "";

  let dropDownModelIngredient = new DropDown("Ingrédients", ingredientList);
  let dropDownModelAppareils = new DropDown("Appareils", appareilList);
  let dropDownModelUstensiles = new DropDown("Ustensiles", ustensileList);

  dropDownsContainer.innerHTML += dropDownModelIngredient.getDropDown();
  dropDownsContainer.innerHTML += dropDownModelAppareils.getDropDown();
  dropDownsContainer.innerHTML += dropDownModelUstensiles.getDropDown();
}

function filterAndRenderDropdowns() {
  filterDropdowns();
  renderDropDowns();
}
