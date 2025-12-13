import initializeState from '../util/initializeState.js';
import router from '../util/router.js';
import { removeToken } from '../util/tokenUtils.js';
import HomeView from '../views/homeView.js';

export default class HomePage {
  #state;

  constructor(state) {
    this.#state = state;
    this.view = new HomeView({
      onLogout: this.#onLogout,
    });

    this.#getProfile();
  }

  #updateView(updates) {
    Object.assign(this.#state, updates);
    this.view.update(this.#state);
  }

  #onLogout = async () => {
    removeToken();

    // reset state
    Object.assign(this.#state, initializeState());
    try {
      const response = await fetch('/user/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`Logout failed. Reason: HTTP ${response.status}`);
      }

      router.navigateTo('login');
    } catch (error) {
      Object.assign(this.#state, { error: error.message });
      this.#updateView(this.#state);
    }
  };

  async #getProfile() {
    try {
      const response = await fetch('/user/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.#state.token}`,
        },
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = { message: 'HTTP ' + response.status };
      }

      if (!response.ok) {
        Object.assign(this.#state, { error: data.message });
        removeToken();
        Object.assign(this.#state, initializeState());
        router.navigateTo('login');
        return;
      }

      this.#updateView({ profile: data.message });
    } catch (error) {
      Object.assign(this.#state, { error: error.message });
      this.#updateView(this.#state);
    }
  }

  get root() {
    return this.view.root;
  }
}
