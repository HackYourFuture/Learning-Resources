import {
  getAllPosts,
  getUsers,
  deleteUserByAdmin,
} from '../services/admin.js';
import { getProfile, deletePost } from '../services/services.js';
import { removeToken } from '../lib/tokenUtils.js';
import AdminView from '../views/adminView.js';
import BasePage from './basePage.js';

export default class AdminPage extends BasePage {
  constructor(props) {
    super(props);
    this.view = new AdminView({
      onBack: this.#onBack,
      onDeleteUser: this.#onDeleteUser,
      onDeletePost: this.#onDeletePost,
      onReloadPosts: this.#onReloadPosts,
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
      if (profile.role !== 'admin') {
        this.router.navigateTo('home');
        return;
      }

      const users = await getUsers(token);
      const posts = await getAllPosts(token);
      this.state.update({ users, posts, error: null, success: null });
    } catch (error) {
      if (!this.#handleAuthError(error)) {
        this.state.update({ error: error.message });
      }
    }
  }

  #onBack = () => {
    this.router.navigateTo('home');
  };

  #onDeleteUser = async (name) => {
    const { token } = this.state.get();
    try {
      await deleteUserByAdmin(token, name);
      const users = await getUsers(token);
      this.state.update({
        users,
        error: null,
        success: `User "${name}" deleted.`,
      });
    } catch (error) {
      if (!this.#handleAuthError(error)) {
        this.state.update({ error: error.message, success: null });
      }
    }
  };

  #onDeletePost = async (id) => {
    const { token } = this.state.get();
    try {
      await deletePost(token, id);
      const posts = await getAllPosts(token);
      this.state.update({
        posts,
        error: null,
        success: `Post #${id} deleted.`,
      });
    } catch (error) {
      if (!this.#handleAuthError(error)) {
        this.state.update({ error: error.message, success: null });
      }
    }
  };

  #onReloadPosts = async () => {
    const { token } = this.state.get();
    try {
      const posts = await getAllPosts(token);
      this.state.update({ posts, error: null });
    } catch (error) {
      if (!this.#handleAuthError(error)) {
        this.state.update({ error: error.message });
      }
    }
  };
}
