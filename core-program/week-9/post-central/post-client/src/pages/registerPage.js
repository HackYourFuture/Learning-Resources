import { register } from '../services/services.js';
import RegisterView from '../views/registerView.js';
import BasePage from './basePage.js';

export default class RegisterPage extends BasePage {
  constructor(props) {
    super(props);
    this.view = new RegisterView({
      onSubmit: this.#onSubmit,
      onLogin: this.#onLogin,
    });
  }

  #onSubmit = async (name, password) => {
    try {
      await register(name, password);
      this.router.navigateTo('register-success');
    } catch (error) {
      this.state.update({ error: error.message });
    }
  };

  #onLogin = () => {
    this.router.navigateTo('login');
  };
}
