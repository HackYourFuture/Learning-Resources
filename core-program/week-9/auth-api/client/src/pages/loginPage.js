import fetchJson from '../lib/fetchJson.js';
import { putToken } from '../lib/tokenUtils.js';
import LoginView from '../views/loginView.js';

export default class LoginPage {
  #state;
  #router;

  constructor(props) {
    this.#state = props.state;
    this.#router = props.router;

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
      this.#state.update({ token, error: null });

      this.#router.navigateTo('home');
    } catch (error) {
      this.#state.update({ error: error.message });
    }
  };

  #onRegister = () => {
    this.#router.navigateTo('register');
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
