let tagsContainer = document.getElementById("tags-container");
function addListenerForTags() {
  const ingredientDropDownMenuLinks = document.querySelectorAll(
    "#ingredient-container .dropdown-menu a"
  );
  const appareilDropDownMenuLinks = document.querySelectorAll(
    "#appareil-container .dropdown-menu a"
  );
  const ustensileDropDownMenuLinks = document.querySelectorAll(
    "#ustensile-container .dropdown-menu a"
  );

  ingredientDropDownMenuLinks.forEach(function (element) {
    element.addEventListener(
      "click",
      function () {
        addTag("ingredient", element.innerHTML);
      },
      false
    );
  });
  appareilDropDownMenuLinks.forEach(function (element) {
    element.addEventListener(
      "click",
      function () {
        addTag("appareil", element.innerHTML);
      },
      false
    );
  });
  ustensileDropDownMenuLinks.forEach(function (element) {
    element.addEventListener(
      "click",
      function () {
        addTag("ustensile", element.innerHTML);
      },
      false
    );
  });
}
function addTag(type, label) {
  const currentTag = new Tag(type, label);
  tagsContainer.innerHTML = tagsContainer.innerHTML + currentTag.getTag();
}
