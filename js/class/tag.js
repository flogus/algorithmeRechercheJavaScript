class Tag {
  constructor(type, label) {
    this._type = type;
    this._label = label;
  }
  init() {
    this.getTag();
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
}
