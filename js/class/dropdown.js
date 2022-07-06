class DropDown {
  constructor(type, data) {
    this._type = type;
    this._data = data;
  }
  getClassName = () => {
    this._class = this._type.toLowerCase().slice(0, -1).replaceAll("é", "e");
    return this._class;
  };
  getName = () => {
    this._class = this._type.toLowerCase().slice(0, -1);
    return this._class;
  };

  buildMenu = (data) => {
    let menu = "<div class='d-flex align-items-start flex-row flex-wrap'>";
    this._data.forEach(function (element) {
      menu +=
        "<div class='px-2 flex-33'><a href='#'>" +
        capitalizeFirstLetter(element) +
        "</a></div>";
    });
    menu += "</div>";
    return menu;
  };

  getDropDown = (type) => {
    let template =
      "<div class='btn-group' id='" + this.getClassName() + "-container'>";
    template += `<button type="button" class="btn bg-`;
    template += this.getClassName();
    template += ` dropdown-toggle" data-toggle="dropdown" aria-expanded="false">`;
    template += this._type;
    template += `</button>`;
    template += `<div class="dropdown-menu bg-`;
    template += this.getClassName();
    template += `">
    <div class="dropdown-item p-2" href="#">
      <div class="col">
        <div class="row p-1">
          <form>`;
    template +=
      `<input type="search" id="search` +
      this.getClassName() +
      `" placeholder="Rechercher un ` +
      this.getName() +
      `"/>`;
    template +=
      `
          </form>
        </div>
      </div>
    </div>
    <div id="dropDownMenu-` +
      this.getClassName() +
      `" class="p-2 overflow-large">`;
    template += this.buildMenu();
    template += "</div>";
    template += "</div></div>";
    return template;
  };
}
