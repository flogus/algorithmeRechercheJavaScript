async function getRecipes() {
  const recipes = await fetch("./data/recipes.json")
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => {
      console.error("Erreur fetch recipes");
    });

  return {
    recipes,
  };
}
async function init() {
  const { recipes } = await getRecipes();
  console.log("init");
}
init();
