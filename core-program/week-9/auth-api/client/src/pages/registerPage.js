import router from '../util/router.js';
import RegisterView from '../views/registerView.js';

export default class RegisterPage {
  #state;

  constructor(state) {
    this.#state = state;
    this.view = new RegisterView({
      onSubmit: this.#onSubmit,
      onLogin: this.#onLogin,
    });
  }

  #updateView(updates) {
    Object.assign(this.#state, updates);
    this.view.update(this.#state);
  }

  #onSubmit = async (username, password) => {
    try {
      const response = await fetch('/user/register', {
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

      router.navigateTo('register-success');
    } catch (error) {
      Object.assign(this.#state, { error: error.message });
      this.#updateView(this.#state);
    }
  };

  #onLogin = () => {
    router.navigateTo('login');
  };

  get root() {
    return this.view.root;
  }
}
