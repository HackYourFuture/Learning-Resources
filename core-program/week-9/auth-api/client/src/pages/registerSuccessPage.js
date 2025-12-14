import RegisterSuccessView from '../views/registerSuccessView.js';
import Page from './page.js';

export default class RegisterSuccessPage extends Page {
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
