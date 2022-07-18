/**
 * return a list of found elements
 * @param {*} type
 * @returns tempListLow
 */
function getSearchList(type) {
  var searchBoxValue = document.getElementById(type).value;
  var typeName = type.split("-").pop();

  const dropContainerCollection = document.getElementById(
    "dropDownMenu-" + typeName
  ).firstElementChild.children;

  let listLow = "";
  let tempListLow = new Array();
  if (typeName == "ingredient") {
    listLow = getFilterDropDowns()[3];
  }
  if (typeName == "appareil") {
    listLow = getFilterDropDowns()[4];
  }
  if (typeName == "ustensile") {
    listLow = getFilterDropDowns()[5];
  }

  // Loop on every elemts of the current list (ingredient, appareil or ustensile)
  eval(listLow).forEach(function (element, index) {
    if (searchBoxValue.length > 2) {
      // Is the searchBoxValue is in the list
      if (element.includes(searchBoxValue)) {
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
            if (typeName == "ustensile") {
              if (key == "ustensils") {
                value.forEach(function (val) {
                  // if found once add all ustensiles
                  if (searchableWords(val).includes(element)) {
                    value.forEach(function (val) {
                      if (!tempListLow.includes(searchableWords(val))) {
                        tempListLow.push(searchableWords(val));
                      }
                    });
                  }
                });
              }
            }
            if (typeName == "appareil") {
              if (key == "appliance") {
                // if found add to appareils
                if (searchableWords(value).includes(element)) {
                  if (!tempListLow.includes(searchableWords(value))) {
                    tempListLow.push(searchableWords(value));
                  }
                }
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
