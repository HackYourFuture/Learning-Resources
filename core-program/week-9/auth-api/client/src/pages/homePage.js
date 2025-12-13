import fetchJson from '../lib/fetchJson.js';
import $state from '../lib/observableState.js';
import router from '../lib/router.js';
import { removeToken } from '../lib/tokenUtils.js';
import HomeView from '../views/homeView.js';

export default class HomePage {
  constructor() {
    this.view = new HomeView({
      onLogout: this.#onLogout,
    });

    this.#getProfile();
  }

  #onLogout = async () => {
    $state.set({});

    try {
      const result = await fetchJson('/user/logout', { method: 'POST' });
      if (!result.ok) {
        throw new Error(result.message || `Logout failed. HTTP ${result.status}`);
      }
    } catch (error) {
      $state.update({ error: error.message });
    } finally {
      removeToken();
      router.navigateTo('login');
    }
  };

  async #getProfile() {
    try {
      const { token } = $state.get();
      if (!token) {
        throw new Error('No token found');
      }
      const result = await fetchJson('/user/me', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!result.ok) {
        $state.update({ error: result.message });
        removeToken();
        $state.set({});
        router.navigateTo('login');
        return;
      }

      // Depending on server shape, prefer data.user; keep message for compatibility
      const profile = result.data?.user ?? result.data?.message ?? null;
      $state.update({ profile });
    } catch (error) {
      $state.update({ error: error.message });
    }
  }

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
