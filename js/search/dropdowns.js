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

  dropDownSearchBox("ingredient");
  dropDownSearchBox("appareil");
  dropDownSearchBox("ustensile");
}

function dropDownSearchBox(type) {
  const searchBox = document.getElementById("search" + type);
  searchBox.addEventListener("keyup", function (e) {
    searchList(searchBox.value, type);
  });
}

function searchList(searchBoxValue, type) {
  const dropContainerCollection = document.getElementById(
    "dropDownMenu-" + type
  ).firstElementChild.children;

  eval(type + "ListLow").forEach(function (element, index) {
    //Not found then hide
    if (searchBoxValue.length > 2) {
      if (!element.includes(searchBoxValue)) {
        if (dropContainerCollection[index] != null) {
          dropContainerCollection[index].classList.add("d-none");
        }
      }
    } else {
      if (dropContainerCollection[index] != null) {
        dropContainerCollection[index].classList.remove("d-none");
      }
    }
  });
}

function filterAndRenderDropdowns() {
  filterDropdowns();
  renderDropDowns();
}
