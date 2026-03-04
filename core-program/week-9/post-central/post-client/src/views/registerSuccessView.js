import getElementsWithIds from '../lib/getElementsWithIds.js';
import BaseView from './baseView.js';

export default class RegisterSuccessView extends BaseView {
  #props;
  #dom;

  constructor(props) {
    super('div');
    this.#props = props;
    this.root.innerHTML = String.raw`
      <div class="auth-container">
        <div class="auth-card">
          <h2 class="auth-title">Registration Successful</h2>
          <p>You can now login with your name and password.</p>
          <button id="loginBtn" class="btn btn-primary" style="margin-block-start: 20px;">
            Go to Login
          </button>
        </div>
      </div>
    `;

    this.#dom = getElementsWithIds(this.root);
    this.#dom.loginBtn.addEventListener('click', this.#onLogin);
  }

  #onLogin = (e) => {
    e.preventDefault();
    this.#props.onLogin();
  };
}
