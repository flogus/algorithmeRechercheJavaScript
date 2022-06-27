let results = new Array();
function search() {
  //Add data to results
  recipes.forEach((element) => {
    results.push(element.name);
    results.push(element.description);
    element.ingredients.forEach((ingredients) => {
      results.push(ingredients.ingredient);
    });
  });

  const mainSearch = document.getElementById("mainsearch");

  mainSearch.addEventListener("keyup", doTheSearch, false);
  mainSearch.addEventListener("change", doTheSearch, false);

  function doTheSearch(event) {
    if (mainSearch.value.length > 2) {
      const isFound = results.filter((element) => {
        if (element.indexOf(mainSearch.value) !== -1) {
          return true;
        }
      });
      console.log("isFound", isFound);
    }
  }
}
