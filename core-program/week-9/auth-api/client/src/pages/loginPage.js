import fetchJson from '../lib/fetchJson.js';
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
      const result = await fetchJson('/user/login', {
        method: 'POST',
        body: { username, password },
      });

      if (!result.ok) {
        throw new Error(result.message || 'Login failed');
      }

      const token = result.data?.token;
      putToken(token);
      $state.update({ token, error: null });

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
