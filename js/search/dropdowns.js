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
    // console.groupCollapsed("Dropdown : ", index, currentList[index]);
    // console.groupEnd();

    let dropDown = new DropDown(element, currentList[index]);
    dropDownsContainer.innerHTML += dropDown.getDropDown();
    setTimeout(() => {
      dropDownSearchBox("search-" + searchableWords(element));
    }, 100);
  });
  // dropDownSearchBoxes();
}
function dropDownSearchBox(type) {
  var searchBoxId = document.getElementById(type);
  searchBoxId.addEventListener("keyup", function (e) {
    console.log(e.key);
    renderSearchList(type);
  });
}
function dropDownSearchBoxes() {
  // let searchId = "search-" + type;

  document
    .getElementById("search-ustensile")
    .addEventListener("keyup", function (e) {
      console.log("KeyUp", e.key);
    });

  document
    .getElementById("search-ingredient")
    .addEventListener("keyup", function (e) {
      console.log("KeyUp", e.key);
    });

  document
    .getElementById("search-appareil")
    .addEventListener("keyup", function (e) {
      console.log("KeyUp", e.key);
      //searchList(searchBox.value, type);
    });

  // var ser = "search-ingredient";
  // var searchBox2 = document.getElementById(ser);
  // searchBox2.addEventListener("keyup", function (e) {
  //   console.log("keyup", e.key);
  // });
}

function getSearchList(type) {
  var searchBoxValue = document.getElementById(type).value;
  var typeName = type.split("-").pop();

  const dropContainerCollection = document.getElementById(
    "dropDownMenu-" + typeName
  ).firstElementChild.children;

  let listLow = "";
  if (typeName == "ingredient") {
    listLow = getFilterDropDowns()[3];
  }
  if (typeName == "appareil") {
    listLow = getFilterDropDowns()[4];
  }
  if (typeName == "ustensile") {
    listLow = getFilterDropDowns()[5];
  }
  // console.log("listLow", listLow);
  let tempListLow = new Array();

  // Loop on every elemts of the current list (ingredient, appareil or ustensile)
  eval(listLow).forEach(function (element, index) {
    //Not found then hide
    if (searchBoxValue.length > 2) {
      // Is the searchBoxValue is in the list
      if (element.includes(searchBoxValue)) {
        console.info("FOUND", index, element, searchBoxValue);

        // Search in recipes the ingredient of the following element
        recipes.forEach(function (recipe) {
          Object.entries(recipe).forEach((entry) => {
            const [key, value] = entry;
            if (typeName == "ingredient") {
              if (key == "ingredients") {
                value.forEach(function (val) {
                  // if found once add all ingredients
                  if (searchableWords(val.ingredient).includes(element)) {
                    value.forEach(function (val) {
                      if (
                        !tempListLow.includes(searchableWords(val.ingredient))
                      ) {
                        tempListLow.push(searchableWords(val.ingredient));
                      }
                    });
                  }
                });
              }
            }
          });
        });
      }
    } else {
      if (dropContainerCollection[index] != null) {
        dropContainerCollection[index].classList.remove("d-none");
      }
    }
  });
  console.info("tempListLow", tempListLow);
  return tempListLow;
}

function renderSearchList(type) {
  var searchBoxValue = document.getElementById(type).value;

  console.log("type", type);
  var typeName = type.split("-").pop();
  const currentList = getSearchList(type);

  const dropContainerCollection = document.getElementById(
    "dropDownMenu-" + typeName
  ).firstElementChild.children;

  if (searchBoxValue.length > 2) {
    for (let item of dropContainerCollection) {
      const currentTextLink = searchableWords(item.children[0].innerText);
      if (!currentList.includes(currentTextLink)) {
        item.classList.add("d-none");
      } else {
        item.classList.remove("d-none");
      }
    }
  }
}

function filterAndRenderDropdowns() {
  getFilterDropDowns();
  renderDropDowns();
}
