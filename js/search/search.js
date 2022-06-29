const mainSearch = document.getElementById("mainsearch");

function search() {
  //Add data to results
  recipes.forEach((element) => {
    results.push(element.name);
    results.push(element.description);
    element.ingredients.forEach((ingredients) => {
      results.push(ingredients.ingredient);
    });
  });

  mainSearch.addEventListener("keyup", buildResults, false);
  mainSearch.addEventListener("change", buildResults, false);
}
