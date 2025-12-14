import fetchJson from '../lib/fetchJson.js';
import { removeToken } from '../lib/tokenUtils.js';
import HomeView from '../views/homeView.js';

export default class HomePage {
  #router;
  #state;

  constructor(props) {
    this.#router = props.router;
    this.#state = props.state;

    this.view = new HomeView({ onLogout: this.#onLogout });

    this.#getProfile();
  }

  #onLogout = async () => {
    this.#state.clear();

    try {
      const result = await fetchJson('/user/logout', { method: 'POST' });
      if (!result.ok) {
        throw new Error(
          result.message || `Logout failed. HTTP ${result.status}`
        );
      }
    } catch (error) {
      this.#state.update({ error: error.message });
    } finally {
      removeToken();
      this.#router.navigateTo('login');
    }
  };

  async #getProfile() {
    try {
      const { token } = this.#state.get();
      if (!token) {
        throw new Error('No token found');
      }
      const result = await fetchJson('/user/me', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!result.ok) {
        this.#state.update({ error: result.message });
        removeToken();
        this.#state.clear();
        this.#router.navigateTo('login');
        return;
      }

      // Depending on server shape, prefer data.user; keep message for compatibility
      const profile = result.data?.user ?? result.data?.message ?? null;
      this.#state.update({ profile });
    } catch (error) {
      this.#state.update({ error: error.message });
    }
  }

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
