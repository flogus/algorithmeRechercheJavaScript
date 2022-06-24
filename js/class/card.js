class Card {
  constructor(element) {
    this._name = element.name;
    this._time = element.time;
    this._description = element.description;
  }
  buildCard() {
    let card = "<div class='card'>";

    card += `<img class="card-img-top" src='assets/placeholder.png' alt='${this._name}'/>`;

    card += `<div class="row">`;
    card += `<div class="col">${this._name}</div>`;
    card += `<div class="col font-weight-bold">${this._time}</div>`;
    card += `</div>`;

    card += `<div class="row descriptions">`;
    card += `<div class="col">
    
    </div>`;
    card += `<div class="col ellipsis">${this._description}</div>`;
    card += `</div>`;

    card += "</div>";

    return card;
  }
}
