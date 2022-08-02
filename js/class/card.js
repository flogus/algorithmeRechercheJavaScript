class Card {
  constructor(element) {
    this._name = element.name;
    this._time = element.time;
    this._description = element.description;
    this._ingredients = element.ingredients;
  }
  buildCard() {
    let card = "<div class='card m-3'>";

    card += `<img class="card-img-top" src='assets/placeholder.png' alt='${this._name}'/>`;

    card += `<div class="flex-row d-flex">`;
    card += `<div class="mr-auto p-2">${this._name}</div>`;
    card += `<div class="p-2 font-weight-bold text-nowrap"><i class="bi bi-clock"></i>
    ${this._time} min</div>`;
    card += `</div>`;

    card += `<div class="flex-row d-flex descriptions">`;
    card += `<div>`;

    if (this._ingredients !== undefined) {
      card += `<ul class="p-2">`;
      for (let ingredient of Object.keys(this._ingredients)) {
        var ingredients = this._ingredients[ingredient];

        card += `<li><span class='font-weight-bold'>`;
        card += ingredients.ingredient;
        card += `:</span> <span>`;
        if (ingredients.quantity !== undefined) {
          card += ingredients.quantity;
        }
        if (ingredients.unit !== undefined) {
          card += ingredients.unit;
        }
        card += `</span>`;
        card += `</li>`;
      }
      card += `</ul>`;
    }

    card += `</div>`;

    card += `<div class="p-2 overflow-medium">${this._description}</div>`;
    card += `</div>`;

    card += "</div>";

    return card;
  }
}
