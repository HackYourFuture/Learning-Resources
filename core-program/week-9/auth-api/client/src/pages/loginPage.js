import router from '../util/router.js';
import { putToken } from '../util/tokenUtils.js';
import LoginView from '../views/loginView.js';

export default class LoginPage {
  #state;

  constructor(state) {
    this.#state = state;
    this.view = new LoginView({
      onSubmit: this.#onSubmit,
      onRegister: this.#onRegister,
    });
  }

  #updateView(updates) {
    Object.assign(this.#state, updates);
    this.view.update(this.#state);
  }

  #onSubmit = async (username, password) => {
    try {
      const response = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = { message: 'HTTP ' + response.status };
      }

      if (!response.ok) {
        throw new Error(data.message);
      }

      putToken(data.token);
      Object.assign(this.#state, { token: data.token, error: null });

      router.navigateTo('home');
    } catch (error) {
      Object.assign(this.#state, { error: error.message });
      this.#updateView(this.#state);
    }
  };

  #onRegister = () => {
    router.navigateTo('register');
  };

  get root() {
    return this.view.root;
  }
}
