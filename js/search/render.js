function globalRender() {
  console.log("globalRender");
  renderDropDowns();
  renderRecipes();
  updateDropdowns();
  setTotalRecipes();
  addListenerForTags();
}
