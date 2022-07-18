const theData2 = [
  "self",
  "close",
  "development",
  "lend",
  "innovation",
  "inquiry",
  "decisive",
  "jacket",
  "computing",
  "mood",
];

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
  recipes.forEach(function (element) {
    // console.log("element", element);
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
    dropDownObj[index] = new DropDown(element, currentList[index]);

    // Insert the Dropdown in the page
    dropDownsContainer.innerHTML += dropDownObj[index].getDropDown();

    // Insert data in the Dropdown
    dropDownObj[index].setMenu(currentList[index]);

    // let searchBoxId = dropDownObj[index].getSearchBoxId();
    // let searchBoxIdInput = document.getElementById(searchBoxId);
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
 * @param {*} e
 * @param {*} index
 */
function searchDropDownList(event, element, index) {
  // console.log("currentSearchBoxValue", element, event, index);
  const searchBoxValue = element.value;
  const currentList = getFilterDropDowns()[index];
  let tempList = new Array();
  if (searchBoxValue.length > 2) {
    currentList.forEach((element) => {
      let currentEle = searchableWords(element);
      if (searchableWords(element).includes(searchBoxValue)) {
        console.log("found", searchableWords(element), searchBoxValue);
        if (!tempList.includes(element)) {
          tempList.push(element);
        }

        recipes.forEach(function (recipe) {
          // console.log("Recipe : ", recipe);
          Object.entries(recipe).forEach((entry) => {
            const [key, value] = entry;

            if (key == "ingredients" && index == 0) {
              value.forEach(function (ingredients) {
                // if found once add all ingredients
                let currentIng = searchableWords(ingredients.ingredient);
                if (currentIng.includes(currentEle)) {
                  console.log(">>found--------------");
                  console.log("ingredients", ingredients);
                  console.log("val", currentIng, " - element:", currentEle);
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
              console.log("value", value);
              let currentApp = searchableWords(value);
              if (currentApp.includes(currentEle)) {
                if (!tempList.includes(value)) {
                  tempList.push(value);
                }
              }
            }

            // if (key == "ustensils" && index == 2) {
            //   value.forEach(function (ustensile) {
            //     let currentUst = searchableWords(ustensile);
            //     console.log("currentUst", currentUst);
            //     // if found once add all ustensiles
            //     // if (searchableWords(val).includes(element)) {
            //     //   value.forEach(function (val) {
            //     //     if (!tempLis.includes(searchableWords(val))) {
            //     //       tempList.push(searchableWords(val));
            //     //     }
            //     //   });
            //     // }
            //   });
            // }
          });
        });
      }
    });
    console.log("tempList number : ", tempList.length);
    console.log("tempList : ", tempList);
    dropDownObj[index].setMenu(tempList);
  } else {
    dropDownObj[index].setMenu(currentList);
  }
}

function filterAndRenderDropdowns() {
  getFilterDropDowns();
  renderDropDowns();

  setTimeout(() => {
    addListenerForTags();
  }, 500);
}
