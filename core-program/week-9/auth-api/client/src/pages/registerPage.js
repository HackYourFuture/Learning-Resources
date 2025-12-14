import fetchJson from '../lib/fetchJson.js';
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

  #onSubmit = async (username, password) => {
    try {
      const result = await fetchJson('/user/register', {
        method: 'POST',
        body: { username, password },
      });

      if (!result.ok) {
        throw new Error(result.message || 'Register failed');
      }

      this.router.navigateTo('register-success');
    } catch (error) {
      this.state.update({ error: error.message });
    }
  };

  #onLogin = () => {
    this.router.navigateTo('login');
  };
}
