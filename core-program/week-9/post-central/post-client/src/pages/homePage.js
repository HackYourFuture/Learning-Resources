import {
  getProfile,
  getMyPosts,
  createPost,
  editPost,
  deletePost,
} from '../services/services.js';
import { removeToken } from '../lib/tokenUtils.js';
import HomeView from '../views/homeView.js';
import BasePage from './basePage.js';

export default class HomePage extends BasePage {
  constructor(props) {
    super(props);
    this.view = new HomeView({
      onLogout: this.#onLogout,
      onCreatePost: this.#onCreatePost,
      onEditPost: this.#onEditPost,
      onDeletePost: this.#onDeletePost,
      onAdmin: this.#onAdmin,
    });
    this.#loadData();
  }

  #handleAuthError(error) {
    if (error.status === 401) {
      removeToken();
      this.state.clear();
      this.router.navigateTo('login');
      return true;
    }
    return false;
  }

  async #loadData() {
    const { token } = this.state.get();
    if (!token) {
      this.router.navigateTo('login');
      return;
    }

    try {
      const profile = await getProfile(token);
      const posts = await getMyPosts(token);

      this.state.update({
        user: profile.user,
        role: profile.role,
        posts,
        error: null,
      });
    } catch (error) {
      if (!this.#handleAuthError(error)) {
        this.state.update({ error: error.message });
      }
    }
  }

  #onAdmin = () => {
    this.router.navigateTo('admin');
  };

  #onLogout = () => {
    removeToken();
    this.state.clear();
    this.router.navigateTo('login');
  };

  #onCreatePost = async (text) => {
    const { token } = this.state.get();
    try {
      await createPost(token, text);
      await this.#refreshPosts();
    } catch (error) {
      if (!this.#handleAuthError(error)) {
        this.state.update({ error: error.message });
      }
    }
  };

  #onEditPost = async (id, text) => {
    const { token } = this.state.get();
    try {
      await editPost(token, id, text);
      await this.#refreshPosts();
    } catch (error) {
      if (!this.#handleAuthError(error)) {
        this.state.update({ error: error.message });
      }
    }
  };

  #onDeletePost = async (id) => {
    const { token } = this.state.get();
    try {
      await deletePost(token, id);
      await this.#refreshPosts();
    } catch (error) {
      if (!this.#handleAuthError(error)) {
        this.state.update({ error: error.message });
      }
    }
  };

  async #refreshPosts() {
    const { token } = this.state.get();
    const posts = await getMyPosts(token);
    this.state.update({ posts, error: null });
  }
}
