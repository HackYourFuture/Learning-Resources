import getElementsWithIds from '../lib/getElementsWithIds.js';
import BaseView from './baseView.js';
import ModalDialogView from './modalDialogView.js';

export default class LoginView extends BaseView {
  #props;
  #dom;
  #modalView;

  constructor(props) {
    super('div');
    this.#props = props;
    this.root.innerHTML = String.raw`
      <div class="container">
        <div class="row">
          <div class="col s10 offset-s1 m6 offset-m3 z-depth-1 user-panel">
            <form id="form" class="col s12">
              <h5 class="user-title">Login</h5>
              <div class="input-field">
                <label for="username">Username</label>
                <input type="text" class="validate" id="username"/>
              </div>
              <div class="input-field" >
                <label for="password">Password</label>
                <input type="password" class="validate" id="password" />
              </div>
              <input type="submit" class="waves-effect waves-light btn user-submit-btn"/>
              <div>
                <p>Not yet registered? 
                <a href="#"
                  style="text-decoration: none;" id="registerLink">
                  Register
                </a>
              </p>
            </div>
            </form>
          </div>
        </div>
      </div>    
    `;

    this.#modalView = new ModalDialogView({ title: 'Login Failed' });
    this.root.append(this.#modalView.root);

    this.#dom = getElementsWithIds(this.root);

    this.#dom.form.addEventListener('submit', this.#onSubmit);
    this.#dom.registerLink.addEventListener('click', this.#onRegister);
  }

  #onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.#dom;
    this.#props.onSubmit(username.value, password.value);
  };

  #onRegister = (e) => {
    e.preventDefault();
    this.#props.onRegister();
  };

  update(state) {
    this.#modalView.update(state);
  }
}
