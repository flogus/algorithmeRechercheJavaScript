let ingredientsFiltered = new Array();
let applianceFiltered = new Array();
let ustensilsFiltered = new Array();
let tags = new Array();
let results = new Array();

async function buildDropDowns() {
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
}

async function buildResults() {
  if (mainSearch.value.length > 2 || mainSearch.value.length == 0) {
    //clone recipes
    let tempRecipes = [...recipes];

    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "";

    if (mainSearch.value.length == 0) {
      tempRecipes.forEach((element) => {
        const cardModel = new Card(element);
        cardsContainer.innerHTML += cardModel.buildCard();
      });
    } else {
      tempRecipes.forEach((element, index) => {
        const searchValue = mainSearch.value.toLowerCase();
        const nameValue = element.name.toLowerCase();
        const descriptionValue = element.description.toLowerCase();

        element.ingredients.forEach((elementIng, index) => {
          const ingredientsValue = elementIng.ingredient.toLowerCase();
          if (ingredientsValue.search(searchValue) != -1) {
            const cardModel = new Card(element);
            cardsContainer.innerHTML += cardModel.buildCard();
          }
        });

        if (
          nameValue.search(searchValue) != -1 ||
          descriptionValue.search(searchValue) != -1
        ) {
          const cardModel = new Card(element);
          cardsContainer.innerHTML += cardModel.buildCard();
        }
      });
    }
  }
}

/**
 * filter the recipes for the three dropdowns
 */
async function filterObjForDropdowns() {
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
async function init() {
  filterObjForDropdowns();
  buildDropDowns();
  buildResults();
  doFocus();
  search();
  addListenerForTags();
}
init();
