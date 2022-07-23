function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}
function searchableWords(string) {
  const str = string
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return str;
}

function setTotalRecipes() {
  const totalFindId = document.getElementById("totalFind");
  totalFindId.innerHTML = "";
  const currentRecipes = getFilterRecipes();
  if (currentRecipes.length > 1) {
    totalFindId.innerHTML = currentRecipes.length + " recettes";
  } else {
    totalFindId.innerHTML = currentRecipes.length + " recette";
  }
}
