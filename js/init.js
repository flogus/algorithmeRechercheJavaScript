// Declare the dropdowns
let dropDowns = new Array("Ingrédient", "Appareil", "Ustensile");
let tags = new Array();

async function init() {
  globalRender();
  doFocus();
  addListenerForMainSearch();
}
init();
