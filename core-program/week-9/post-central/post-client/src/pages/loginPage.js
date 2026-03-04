import { login } from '../services/services.js';
import { putToken } from '../lib/tokenUtils.js';
import LoginView from '../views/loginView.js';
import BasePage from './basePage.js';

export default class LoginPage extends BasePage {
  constructor(props) {
    super(props);
    this.view = new LoginView({
      onSubmit: this.#onSubmit,
      onRegister: this.#onRegister,
    });
  }

  #onSubmit = async (name, password) => {
    try {
      const data = await login(name, password);

      putToken(data.token);
      this.state.update({ token: data.token, user: data.user, error: null });

      this.router.navigateTo('home');
    } catch (error) {
      this.state.update({ error: error.message });
    }
  };

  #onRegister = () => {
    this.router.navigateTo('register');
  };
}
