function addListenerForTags() {
  // console.log("addListenerForTags");
  const dropDownMenuLinks = document.querySelectorAll(".dropdown-menu a");

  dropDownMenuLinks.forEach(function (element) {
    element.addEventListener("click", clickAddTag, false);
  });
}

function clickAddTag() {
  const currentType =
    this.parentElement.parentElement.parentElement.parentElement.id.split(
      "-"
    )[1];
  const tagCurrentValue = this.innerHTML;
  const tagCurrentLow = searchableWords(this.innerHTML);

  if (!tags.includes(tagCurrentLow)) {
    tags.push(tagCurrentLow);
    renderTag(currentType, tagCurrentValue);
  }
  removeCurrentTag();
  globalRender();
}

let tagsContainer = document.getElementById("tags-container");
function renderTag(type, label) {
  const currentTag = new Tag(type, label);
  tagsContainer.innerHTML = tagsContainer.innerHTML + currentTag.getTag();
}

function removeCurrentTag() {
  console.log("removeCurrentTag");
  const allTagContainer = document.querySelectorAll("div.alert");
  allTagContainer.forEach((tag) => {
    const tagLow = searchableWords(tag.textContent);
    tag.children[0].setAttribute("data-text", tagLow);
    tag.children[0].addEventListener("click", (e) => {
      const position = tags.indexOf(
        e.path[0].attributes["data-text"].nodeValue
      );
      if (position != -1) {
        tags.splice(position, 1);
        globalRender();
      }
    });
  });
}
