import getElementsWithIds from '../util/getElementsWithIds.js';
import ModalDialView from './modalDialogView.js';

export default class RegisterSuccessView {
  #props;
  #root;
  #modalView;
  #dom;

  constructor(props) {
    this.#props = props;
    this.#root = document.createElement('div');
    this.#root.innerHTML = String.raw`
    <div class="container">
      <div class="row">
        <div class="col s6 offset-s3 z-depth-1 user-panel">
          <form id="registerForm" class="col s12">
            <h5 class="user-title">Register</h5>
            <div class="input-field">
              <input type="text" class="validate" id="username"/>
              <label for="username">Username</label>
            </div>
            <div class="input-field">
              <input type="password" class="validate" id="password"/>
              <label for="password">Password</label>
            </div>
            <input type="submit" class="waves-effect waves-light btn user-submit-btn" id="register__submit-btn"/>
            <div>
              <p>Already registered? 
                <a href="#"
                style="text-decoration: none;" id="loginLink">
                Login
              </a>
            </p>
          </form>
          </div>
        </div>
      </div>
    </div>     
    `;

    this.#modalView = new ModalDialView({ title: 'Registration Failed' });
    this.#root.append(this.#modalView.root);

    this.#dom = getElementsWithIds(this.#root);
    this.#dom.registerForm.addEventListener('submit', this.#onSumbit);
    this.#dom.loginLink.addEventListener('click', this.#onLogin);
  }

  #onSumbit = (e) => {
    e.preventDefault();
    const { username, password } = this.#dom;
    this.#props.onSubmit(username.value, password.value);
  };

  #onLogin = (e) => {
    e.preventDefault();
    this.#props.onLogin();
  };

  update(state) {
    this.#modalView.update(state);
  }

  get root() {
    return this.#root;
  }
}
