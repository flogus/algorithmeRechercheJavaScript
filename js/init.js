let ingredientsFiltered = new Array();
let applianceFiltered = new Array();
let ustensilsFiltered = new Array();
let tags = new Array();
let results = new Array();
let tempRecipes = [...recipes];
let filteredRecipes = new Array();

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

async function buildResults() {
  if (mainSearch.value.length > 2 || mainSearch.value.length == 0) {
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "";

    if (mainSearch.value.length == 0) {
      // If no data in the searchbox, we don't need to filter
      tempRecipes.forEach((element) => {
        const cardModel = new Card(element);
        cardsContainer.innerHTML += cardModel.buildCard();
      });
    } else {
      const indexArray = new Array();
      let totalFind = 0;
      tempRecipes.forEach((element, index) => {
        const searchValue = mainSearch.value.toLowerCase();
        const nameValue = element.name.toLowerCase();
        const descriptionValue = element.description.toLowerCase();

        element.ingredients.forEach((elementIng, indexIng) => {
          const ingredientsValue = elementIng.ingredient.toLowerCase();
          if (ingredientsValue.search(searchValue) != -1) {
            indexArray.push(indexIng);
            //console.log("ingredient", indexIng, element.name);
            totalFind++;
            const cardModel = new Card(element);
            cardsContainer.innerHTML += cardModel.buildCard();
          }
        });

        if (
          nameValue.search(searchValue) != -1 ||
          descriptionValue.search(searchValue) != -1
        ) {
          // if (!indexArray.includes(index)) {
          //console.log("autre", index, element.name);
          totalFind++;
          const cardModel = new Card(element);
          cardsContainer.innerHTML += cardModel.buildCard();
          // }
        }
      });
    }
  }
}

function filterRecipes() {
  let totalFind = 0;
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
          totalFind++;
        }
      }
      if (descriptionValue.search(searchValue) != -1) {
        if (!filteredRecipes.includes(element)) {
          filteredRecipes.push(element);
          totalFind++;
        }
      }

      element.ingredients.forEach((elementIng) => {
        const ingredientsValue = elementIng.ingredient.toLowerCase();
        if (ingredientsValue.search(searchValue) != -1) {
          if (!filteredRecipes.includes(element)) {
            filteredRecipes.push(element);
            totalFind++;
          }
        }
      });
    });
  } else {
    filteredRecipes = [...recipes];
  }

  document.getElementById("totalFind").innerHTML = "";
  document.getElementById("totalFind").innerHTML = totalFind;

  console.log("filteredRecipes :", filteredRecipes);
}

function renderRecipes() {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";
  filteredRecipes.forEach((element, index) => {
    const cardModel = new Card(element);
    cardsContainer.innerHTML += cardModel.buildCard();
  });
}

function filterAndRenderResults() {
  filterRecipes();
  renderRecipes();
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
  filterAndRenderResults();
  doFocus();
  search();
  // searchDropDown();
  addListenerForTags();
}
init();
