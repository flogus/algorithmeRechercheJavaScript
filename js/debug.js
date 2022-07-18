const theTestData = [
  "civilization",
  "storage",
  "pump",
  "coffin",
  "decline",
  "chase",
  "lily",
  "hurt",
  "please",
  "federation",
  "evening",
  "transport",
  "chimney",
  "stadium",
  "appear",
  "capital",
  "emergency",
];

const theTestData2 = [
  "self",
  "close",
  "development",
  "lend",
  "innovation",
  "inquiry",
  "decisive",
  "jacket",
  "computing",
  "mood",
];

function buildTheDropDown() {
  theDropDown = new DropDown("ustensile");
  const theDropDownHtml = theDropDown.getDropDown();

  theDropDown2 = new DropDown("ingredient");
  const theDropDown2Html = theDropDown2.getDropDown();
  document.getElementById("dropdown").innerHTML = theDropDownHtml;
  document.getElementById("dropdown2").innerHTML = theDropDown2Html;
  theDropDown.setMenu(theTestData);
  theDropDown2.setMenu(theTestData);
}
function addEvent() {
  const buttonID = document.getElementById("button");
  buttonID.addEventListener("click", function () {
    changeData();
  });
}
function changeData() {
  // console.log("changeData");
  theDropDown2.setMenu(theData2);
}
function init() {
  buildTheDropDown();
  addEvent();
  console.log(theDropDown2);
}

init();
