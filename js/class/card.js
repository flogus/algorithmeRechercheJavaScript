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
    card += `<div class="p-2 font-weight-bold"><i class="bi bi-clock"></i>
    ${this._time}</div>`;
    card += `</div>`;

    card += `<div class="flex-row d-flex descriptions">`;
    card += `<div>`;
    card += `<ul class="p-2">`;
    for (const element of this._ingredients) {
      card += `<li><span class='font-weight-bold'>`;
      card += element["ingredient"];
      card += `:</span> <span>`;
      if (element["quantity"] !== undefined) {
        card += element["quantity"];
      }
      if (element["unit"] !== undefined) {
        card += element["unit"];
      }
      card += `</span>`;
      card += `</li>`;
    }
    card += `</ul>`;
    card += `</div>`;

    card += `<div class="p-2">${this._description}</div>`;
    card += `</div>`;

    card += "</div>";

    return card;
  }
}
