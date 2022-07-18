class DropDown {
  /**
   *
   * @param {string} type
   * @param {array} data
   */
  constructor(type, data) {
    if (type == undefined || type == "") {
      type = "ingredient";
    }
    this._type = type;
    this._data = data;
    this._menuId =
      Date.now() * Math.floor(Math.random() * 100) +
      "-" +
      Math.floor(Math.random() * 100);
  }
  #getClassName = () => {
    this._class = this._type.toLowerCase().replaceAll("é", "e");
    return this._class;
  };

  #getName = () => {
    this._class = this._type.toLowerCase();
    return this._class;
  };

  #buildMenu = (data) => {
    this._data = data;

    let menu =
      "<div id='" +
      this._menuId +
      "' class='dropDownMenu d-flex align-items-start flex-row flex-wrap w-100'>";
    if (this._data == null) {
      menu += "<div class='px-2 flex-100'>no data for the menu</div>";
    } else {
      this._data.forEach(function (element) {
        menu +=
          "<div class='px-2 flex-33'><a href='#'>" +
          capitalizeFirstLetter(element) +
          "</a></div>";
      });
    }
    menu += "</div>";
    return menu;
  };

  #getData = () => {
    return this._data;
  };

  getSearchBoxId = () => {
    return "search-" + this._menuId;
  };

  #addFocus = () => {
    const searchBoxId = "search-" + this._menuId;
    const searchBox = document.getElementById(searchBoxId);
    // let currentData = this.#getData();

    // Focus in searchbox
    $("#" + searchableWords(this._type) + "-container").on(
      "show.bs.dropdown",
      function () {
        setTimeout(() => {
          searchBox.focus();
        }, 0);
      }
    );
  };

  /**
   *
   * @param {array} data
   */
  setMenu = (data) => {
    document.getElementById(this._menuId).innerHTML = this.#buildMenu(data);
  };

  /**
   * Returns HTML template
   *
   * @returns {string} HTML template of the DropDown
   */
  getDropDown = () => {
    let template =
      "<div class='btn-group' id='" + this.#getClassName() + "-container'>";
    template += `<button type="button" class="btn bg-`;
    template += this.#getClassName();
    template += ` dropdown-toggle" data-toggle="dropdown" aria-expanded="false">`;
    template += this._type;
    template += `s</button>`;
    template += `<div class="dropdown-menu bg-`;
    template += this.#getClassName();
    template += `">
    <div class="dropdown-item p-2" href="#">
      <div class="col">
        <div class="row p-1">
          <form>`;
    template +=
      `<input type="search" id="search-` +
      this._menuId +
      `" placeholder="Rechercher un ` +
      this.#getName() +
      `"/>`;
    template +=
      `
          </form>
        </div>
      </div>
    </div>
    <div id="dropDownMenu-` +
      this.#getClassName() +
      `" class="p-2 overflow-large">`;
    template += this.#buildMenu();
    template += "</div>";
    template += "</div></div>";

    setTimeout(() => {
      this.#addFocus();
    }, 200);
    return template;
  };
}
