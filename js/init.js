async function buildResults() {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";

  recipes.forEach((element) => {
    console.log(element);

    const cardModel = new Card(element);
    cardsContainer.innerHTML += cardModel.buildCard();
  });
}
async function init() {
  console.log("init");
  buildResults();
}
init();
