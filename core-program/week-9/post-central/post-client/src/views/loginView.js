import getElementsWithIds from '../lib/getElementsWithIds.js';
import BaseView from './baseView.js';

export default class LoginView extends BaseView {
  #props;
  #dom;

  constructor(props) {
    super('div');
    this.#props = props;
    this.root.innerHTML = String.raw`
      <div class="auth-container">
        <div class="auth-card">
          <h2 class="auth-title">Login</h2>
          <div id="errorSlot"></div>
          <form id="form">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" required autocomplete="username" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" required autocomplete="current-password" />
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
          <p class="auth-link">
            Not yet registered? <a href="#" id="registerLink">Register</a>
          </p>
        </div>
      </div>
    `;

    this.#dom = getElementsWithIds(this.root);
    this.#dom.form.addEventListener('submit', this.#onSubmit);
    this.#dom.registerLink.addEventListener('click', this.#onRegister);
  }

  #onSubmit = (e) => {
    e.preventDefault();
    const { name, password } = this.#dom;
    this.#props.onSubmit(name.value, password.value);
  };

  #onRegister = (e) => {
    e.preventDefault();
    this.#props.onRegister();
  };

  update(state) {
    if (state.error) {
      this.#dom.errorSlot.innerHTML = `
        <div class="error-banner">
          <span>${state.error}</span>
          <button class="error-close-btn" type="button">&times;</button>
        </div>
      `;
      this.#dom.errorSlot
        .querySelector('.error-close-btn')
        .addEventListener('click', () => {
          this.#dom.errorSlot.innerHTML = '';
        });
    } else {
      this.#dom.errorSlot.innerHTML = '';
    }
  }
}
