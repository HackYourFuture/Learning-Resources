import fetchJson from '../lib/fetchJson.js';
import RegisterView from '../views/registerView.js';

export default class RegisterPage {
  #state;
  #router;

  constructor(props) {
    this.#state = props.state;
    this.#router = props.router;

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

      this.#router.navigateTo('register-success');
    } catch (error) {
      this.#state.update({ error: error.message });
    }
  };

  #onLogin = () => {
    this.#router.navigateTo('login');
  };

  pageDidLoad() {
    this.#state.subscribe(this.view);
  }

  pageWillUnload() {
    this.#state.unsubscribe(this.view);
  }

  get root() {
    return this.view.root;
  }
}
