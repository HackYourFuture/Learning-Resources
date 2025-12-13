import router from '../lib/router.js';
import RegisterSuccessView from '../views/registerSuccessView.js';

export default class RegisterSuccessPage {
  constructor() {
    this.view = new RegisterSuccessView({
      onLogin: this.#onLogin,
    });
  }

  #onLogin = () => {
    router.navigateTo('login');
  };

  get root() {
    return this.view.root;
  }
}
