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
