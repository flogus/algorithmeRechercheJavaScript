async function renderDropDowns() {
  const dropDownsContainer = document.getElementById("dropdowns-container");
  dropDownsContainer.innerHTML = "";

  const dropDownModelIngredient = new DropDown(
    "Ingrédients",
    ingredientsFiltered
  );
  const dropDownModelAppareils = new DropDown("Appareils", applianceFiltered);
  const dropDownModelUstensiles = new DropDown("Ustensiles", ustensilsFiltered);

  dropDownsContainer.innerHTML += dropDownModelIngredient.getDropDown();
  dropDownsContainer.innerHTML += dropDownModelAppareils.getDropDown();
  dropDownsContainer.innerHTML += dropDownModelUstensiles.getDropDown();

  const ingredientSearch = document.getElementById("searchingredient");

  if (ingredientSearch) {
    ingredientSearch.addEventListener(
      "keyup",
      function handleClick(event) {
        if (this.value.length > 2) {
          console.log("value :", this.value);
        }
      },
      false
    );
  }
}

/**
 * filter the recipes for the three dropdowns
 */
async function filterDropdowns() {
  recipes.forEach(function (element) {
    let lesIngredients = element.ingredients;
    lesIngredients.forEach(function (ingredients) {
      if (!ingredientsFiltered.includes(ingredients.ingredient)) {
        ingredientsFiltered.push(ingredients.ingredient);
      }
    });
    if (!applianceFiltered.includes(element.appliance)) {
      applianceFiltered.push(element.appliance);
    }
    let lesUstensils = element.ustensils;
    lesUstensils.forEach(function (lesUstensils) {
      if (!ustensilsFiltered.includes(lesUstensils)) {
        ustensilsFiltered.push(lesUstensils);
      }
    });
  });
  /*
    console.groupCollapsed("ingredientsFiltered");
    console.log(ingredientsFiltered);
    console.groupEnd();
    console.groupCollapsed("applianceFiltered");
    console.log(applianceFiltered);
    console.groupEnd();
    console.groupCollapsed("ustensilsFiltered");
    console.log(ustensilsFiltered);
    console.groupEnd();
    */
}

function filterAndRenderDropdowns() {
  filterDropdowns();
  renderDropDowns();
}
