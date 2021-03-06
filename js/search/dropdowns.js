/**
 * Filters recipes for the dropdowns
 * return a list of arrays
 * @returns filteredListDropDowns
 */
function getFilterDropDowns() {
  ingredientArr = new Array();
  appareilArr = new Array();
  ustensileArr = new Array();
  filteredListDropDowns = new Array();
  const filteredRecipes = getFilterRecipes();
  filteredRecipes.forEach(function (element) {
    let lesIngredients = element.ingredients;
    lesIngredients.forEach(function (ingredients) {
      if (!ingredientArr.includes(ingredients.ingredient)) {
        ingredientArr.push(ingredients.ingredient);
      }
    });
    if (!appareilArr.includes(element.appliance)) {
      appareilArr.push(element.appliance);
    }
    let lesUstensiles = element.ustensils;
    lesUstensiles.forEach(function (lesUstensiles) {
      if (!ustensileArr.includes(lesUstensiles)) {
        ustensileArr.push(lesUstensiles);
      }
    });
  });
  filteredListDropDowns.push(ingredientArr, appareilArr, ustensileArr);
  return filteredListDropDowns;
}

/**
 * Render each dropdowns with the DropDown Class
 */
const dropDownObj = {};

async function renderDropDowns() {
  const dropDownsContainer = document.getElementById("dropdowns-container");
  dropDownsContainer.innerHTML = "";

  dropDowns.forEach((element, index) => {
    // Get the lists
    let currentList = getFilterDropDowns();

    // Create a new Dropdown
    if (Object.keys(dropDownObj).length < 3) {
      dropDownObj[index] = new DropDown(element, currentList[index]);
    }
    // Insert the Dropdown in the page
    dropDownsContainer.innerHTML += dropDownObj[index].getDropDown();

    currentList[index].sort();

    // Insert data in the Dropdown
    dropDownObj[index].setMenu(currentList[index]);
  });
  addEventListenerToSearchBoxes();
}
/**
 * Add event listener to the dropdowns searchboxes
 */
function addEventListenerToSearchBoxes() {
  const ids = document.querySelectorAll("#dropdowns-container input");
  ids.forEach((element, index) => {
    element.addEventListener("keyup", (e) => {
      searchDropDownList(e, element, index);
    });
  });
}

/**
 * Make the search for the dropdowns
 * @param {*} event
 * @param {*} element
 * @param {*} index
 */
function searchDropDownList(event, element, index) {
  const searchBoxValue = element.value;
  const currentList = getFilterDropDowns()[index];
  let tempList = new Array();
  if (searchBoxValue.length > 2) {
    currentList.forEach((element) => {
      let currentEle = searchableWords(element);
      const filteredRecipes = getFilterRecipes();
      if (searchableWords(element).includes(searchBoxValue)) {
        if (!tempList.includes(element)) {
          tempList.push(element);
        }

        filteredRecipes.forEach(function (recipe) {
          Object.entries(recipe).forEach((entry) => {
            const [key, value] = entry;

            if (key == "ingredients" && index == 0) {
              value.forEach(function (ingredients) {
                // if found once add all ingredients
                let currentIng = searchableWords(ingredients.ingredient);
                if (currentIng.includes(currentEle)) {
                  value.forEach(function (ingredients) {
                    if (!tempList.includes(ingredients.ingredient)) {
                      tempList.push(ingredients.ingredient);
                    }
                  });
                }
              });
            }

            if (key == "appliance" && index == 1) {
              // if found add to appareils
              let currentApp = searchableWords(value);
              if (currentApp.includes(currentEle)) {
                if (!tempList.includes(value)) {
                  tempList.push(value);
                }
              }
            }
          });
        });
      }
    });
    tempList.sort();
    dropDownObj[index].setMenu(tempList);
  } else {
    currentList.sort();
    dropDownObj[index].setMenu(currentList);
  }
  addListenerForTags();
}
