import $state from '../lib/observableState.js';
import router from '../lib/router.js';
import { putToken } from '../lib/tokenUtils.js';
import LoginView from '../views/loginView.js';

export default class LoginPage {
  constructor() {
    this.view = new LoginView({
      onSubmit: this.#onSubmit,
      onRegister: this.#onRegister,
    });
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
      $state.update({ token: data.token, error: null });

      router.navigateTo('home');
    } catch (error) {
      $state.update({ error: error.message });
    }
  };

  #onRegister = () => {
    router.navigateTo('register');
  };

  pageDidLoad() {
    $state.subscribe(this.view);
  }

  pageWillUnload() {
    $state.unsubscribe(this.view);
  }

  get root() {
    return this.view.root;
  }
}
