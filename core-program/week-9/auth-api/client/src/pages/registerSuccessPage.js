import RegisterSuccessView from '../views/registerSuccessView.js';
import BasePage from './basePage.js';

export default class RegisterSuccessPage extends BasePage {
  constructor(props) {
    super(props);
    this.view = new RegisterSuccessView({
      onLogin: this.#onLogin,
    });
  }

  #onLogin = () => {
    this.router.navigateTo('login');
  };
}
