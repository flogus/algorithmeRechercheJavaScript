const mainSearch = document.getElementById("mainsearch");
const appareilSearch = document.getElementById("searchappareil");
const ustensilSearch = document.getElementById("searchustensile");

function search() {
  //Add data to results
  recipes.forEach((element) => {
    results.push(element.name);
    results.push(element.description);
    element.ingredients.forEach((ingredients) => {
      results.push(ingredients.ingredient);
    });
  });

  mainSearch.addEventListener("keyup", filterAndRenderResults, false);
  mainSearch.addEventListener("change", filterAndRenderResults, false);
}

searchDropDown = () => {
  const allSearchBoxes = document.querySelectorAll("[type='search']");
  allSearchBoxes.forEach(addEventSearch);
};
addEventSearch = (item, index, arr) => {
  console.log(arr[index], item);
  item.addEventListener("keyup", searchDropDownResults, false);
};

searchDropDownResults = () => {
  console.log("searchDropDownResults");
};

function searchIngre(event) {
  let ingredientSearchValue = document.getElementById("searchingredient").value;
  if (ingredientSearchValue > 2 || ingredientSearchValue == 0) {
    console.log("supereir", ingredientSearchValue);
  }
}
