export default class BaseView {
  #root;

  constructor(tagName = 'div') {
    this.#root = document.createElement(tagName);
  }

  update(state) {
    // Default implementation does nothing
  }

  get root() {
    return this.#root;
  }
}
