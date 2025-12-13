import fetchJson from '../lib/fetchJson.js';
import $state from '../lib/observableState.js';
import router from '../lib/router.js';
import RegisterView from '../views/registerView.js';

export default class RegisterPage {
  constructor() {
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

      router.navigateTo('register-success');
    } catch (error) {
      $state.update({ error: error.message });
    }
  };

  #onLogin = () => {
    router.navigateTo('login');
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
