class Tag {
  constructor(type, label) {
    this._type = type;
    this._label = label;
  }
  getTag() {
    let template =
      `<div class="alert bg-` +
      this._type +
      `" role="alert">
        ` +
      this._label +
      `<i class="bi bi-x-circle text-white close" data-dismiss="alert"></i>
      </div>`;
    return template;
  }
  addRemove() {
    console.log("addRemove :", this);
  }
}
