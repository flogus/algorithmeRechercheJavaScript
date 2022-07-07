/**
 * Focus on the searchboxes
 */
function doFocus() {
  $("#ingredient-container").on("show.bs.dropdown", function () {
    setTimeout(() => {
      $("#searchingredient").focus();
    }, 0);
  });
  $("#appareil-container").on("show.bs.dropdown", function () {
    setTimeout(() => {
      $("#searchappareil").focus();
    }, 0);
  });
  $("#ustensile-container").on("show.bs.dropdown", function () {
    setTimeout(() => {
      $("#searchustensile").focus();
    }, 0);
  });
  setTimeout(() => {
    $("#mainsearch").focus();
  }, 50);
}
