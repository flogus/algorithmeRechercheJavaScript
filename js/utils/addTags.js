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
    element.addEventListener("click", clickAddTag, false);
  });
  appareilDropDownMenuLinks.forEach(function (element) {
    element.addEventListener("click", clickAddTag, false);
  });
  ustensileDropDownMenuLinks.forEach(function (element) {
    element.addEventListener("click", clickAddTag, false);
  });
}

function clickAddTag() {
  const currentType =
    this.parentElement.parentElement.parentElement.id.split("-")[1];
  const tagCurrentValue = this.innerHTML;
  const tagCurrentLow = searchableWords(this.innerHTML);
  if (!tags.includes(tagCurrentLow)) {
    tags.push(tagCurrentLow);
    renderTag(currentType, tagCurrentValue);
  }

  const currentList = eval(currentType + "ListLow");
  // Seach in currentList if found tag
  if (currentList.includes(tagCurrentLow)) {
    //Remove from HTML
    this.parentElement.remove();
    //Get index position in array
    const indexPosition = currentList.findIndex(
      (element) => element == tagCurrentLow
    );
    //Remove from currentList
    currentList.splice(indexPosition, 1);
  }
  if (filteredRecipes.includes(tagCurrentLow)) {
    console.log("Found in filtered list");
  }
  removeCurrentTag();

  filterAndRenderResults();
}

function renderTag(type, label) {
  const currentTag = new Tag(type, label);
  tagsContainer.innerHTML = tagsContainer.innerHTML + currentTag.getTag();
  //currentTag.addRemove();
}

function removeCurrentTag() {
  console.log("removeCurrentTag");
  const allTagContainer = document.querySelectorAll("div.alert");
  allTagContainer.forEach((tag) => {
    const tagLow = searchableWords(tag.textContent);
    console.log("tag", tagLow);
    console.log(tags.includes(tagLow));
    console.log(tag.children[0]);
    tag.children[0].setAttribute("data-text", tagLow);
    tag.children[0].addEventListener("click", (e) => {
      const position = tags.indexOf(
        e.path[0].attributes["data-text"].nodeValue
      );
      console.log("position", position);
      if (position != -1) {
        tags.splice(position, 1);
        filterAndRenderResults();
      }
    });
  });
}
