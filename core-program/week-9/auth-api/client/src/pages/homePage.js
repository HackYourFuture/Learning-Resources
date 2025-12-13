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
      const response = await fetch('/user/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`Logout failed. Reason: HTTP ${response.status}`);
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
      const response = await fetch('/user/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = { message: 'HTTP ' + response.status };
      }

      if (!response.ok) {
        $state.update({ error: data.message });
        removeToken();
        $state.set({});
        router.navigateTo('login');
        return;
      }

      $state.update({ profile: data.message });
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
