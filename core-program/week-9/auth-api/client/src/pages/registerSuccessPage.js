import RegisterSuccessView from '../views/registerSuccessView.js';

export default class RegisterSuccessPage {
  #router;

  constructor(props) {
    this.#router = props.router;
    this.view = new RegisterSuccessView({
      onLogin: this.#onLogin,
    });
  }

  #onLogin = () => {
    this.#router.navigateTo('login');
  };

  get root() {
    return this.view.root;
  }
}
