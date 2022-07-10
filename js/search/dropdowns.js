let ingredientList = new Array();
let ingredientListLow = new Array();
let appareilList = new Array();
let appareilListLow = new Array();
let ustensileList = new Array();
let ustensileListLow = new Array();

/**
 * Filters recipes for the dropdowns
 * return a list of arrays
 * @returns filteredListDropDowns
 */
function getFilterDropDowns() {
  ingredientArr = new Array();
  ingredientArrLow = new Array();
  appareilArr = new Array();
  appareilArrLow = new Array();
  ustensileArr = new Array();
  ustensileArrLow = new Array();
  filteredListDropDowns = new Array();
  recipes.forEach(function (element) {
    // console.log("element", element);
    let lesIngredients = element.ingredients;
    lesIngredients.forEach(function (ingredients) {
      if (!ingredientArr.includes(ingredients.ingredient)) {
        ingredientArr.push(ingredients.ingredient);
        ingredientArrLow.push(searchableWords(ingredients.ingredient));
      }
    });
    if (!appareilArr.includes(element.appliance)) {
      appareilArr.push(element.appliance);
      appareilArrLow.push(searchableWords(element.appliance));
    }
    let lesUstensiles = element.ustensils;
    lesUstensiles.forEach(function (lesUstensiles) {
      if (!ustensileArr.includes(lesUstensiles)) {
        ustensileArr.push(lesUstensiles);
        ustensileArrLow.push(searchableWords(lesUstensiles));
      }
    });
  });
  filteredListDropDowns.push(
    ingredientArr,
    appareilArr,
    ustensileArr,
    ingredientArrLow,
    appareilArrLow,
    ustensileArrLow
  );
  return filteredListDropDowns;
}

/**
 * Render each dropdowns with the DropDown Class
 */
async function renderDropDowns() {
  const dropDownsContainer = document.getElementById("dropdowns-container");
  dropDownsContainer.innerHTML = "";

  dropDowns.forEach((element, index) => {
    let currentList = getFilterDropDowns();
    console.groupCollapsed("Dropdown : ", index, currentList[index]);
    console.groupEnd();

    let dropDown = new DropDown(element, currentList[index]);
    dropDownsContainer.innerHTML += dropDown.getDropDown();
    dropDownSearchBox(searchableWords(element));
  });
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
  getFilterDropDowns();
  renderDropDowns();
}
