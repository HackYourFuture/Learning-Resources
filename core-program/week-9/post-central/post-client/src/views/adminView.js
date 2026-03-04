import getElementsWithIds from '../lib/getElementsWithIds.js';
import renderMarkdown from '../lib/markdown.js';
import BaseView from './baseView.js';

export default class AdminView extends BaseView {
  #props;
  #dom;
  #pendingDeleteUser = null;
  #pendingDeletePost = null;

  constructor(props) {
    super('div');
    this.#props = props;
    this.root.innerHTML = String.raw`
      <div class="app-layout">
        <header class="header">
          <div class="container header-inner">
            <span class="header-title">Admin Panel</span>
            <div class="header-right">
              <button id="backBtn" class="btn btn-secondary btn-small">Back to Posts</button>
            </div>
          </div>
        </header>

        <div class="container">
          <div id="errorSlot"></div>
          <div id="successSlot"></div>
        </div>

        <main class="main-content">
          <div class="container">
            <section class="admin-section">
              <h2 class="admin-section-title">Users</h2>
              <div id="usersList" class="admin-users-list"></div>
            </section>

            <section class="admin-section">
              <div class="admin-section-header">
                <h2 class="admin-section-title">Posts</h2>
                <button id="reloadPostsBtn" class="btn btn-secondary btn-small">Reload</button>
              </div>
              <div id="postsList" class="admin-posts-list"></div>
            </section>
          </div>
        </main>

        <dialog id="confirmDialog" class="confirm-dialog">
          <form method="dialog">
            <p id="confirmMessage" class="confirm-dialog-message">Are you sure?</p>
            <div class="confirm-dialog-actions">
              <button value="cancel" class="btn btn-secondary btn-small">Cancel</button>
              <button value="confirm" class="btn btn-danger btn-small">Delete</button>
            </div>
          </form>
        </dialog>
      </div>
    `;

    this.#dom = getElementsWithIds(this.root);

    this.#dom.backBtn.addEventListener('click', this.#onBack);
    this.#dom.reloadPostsBtn.addEventListener('click', this.#onReloadPosts);
    this.#dom.usersList.addEventListener('click', this.#onUserAction);
    this.#dom.postsList.addEventListener('click', this.#onPostAction);
    this.#dom.confirmDialog.addEventListener('close', this.#onDialogClose);
  }

  #onBack = (e) => {
    e.preventDefault();
    this.#props.onBack();
  };

  #onReloadPosts = () => {
    this.#props.onReloadPosts();
  };

  #onUserAction = (e) => {
    const deleteBtn = e.target.closest('.admin-delete-user-btn');
    if (deleteBtn) {
      this.#pendingDeleteUser = deleteBtn.dataset.name;
      this.#dom.confirmMessage.textContent = `Delete user "${deleteBtn.dataset.name}"?`;
      this.#dom.confirmDialog.showModal();
    }
  };

  #onPostAction = (e) => {
    const deleteBtn = e.target.closest('.admin-delete-post-btn');
    if (deleteBtn) {
      this.#pendingDeletePost = parseInt(deleteBtn.dataset.id);
      this.#dom.confirmMessage.textContent = `Delete post #${deleteBtn.dataset.id}?`;
      this.#dom.confirmDialog.showModal();
    }
  };

  #onDialogClose = () => {
    const dialog = this.#dom.confirmDialog;
    if (dialog.returnValue === 'confirm') {
      if (this.#pendingDeleteUser != null) {
        this.#props.onDeleteUser(this.#pendingDeleteUser);
      } else if (this.#pendingDeletePost != null) {
        this.#props.onDeletePost(this.#pendingDeletePost);
      }
    }
    this.#pendingDeleteUser = null;
    this.#pendingDeletePost = null;
  };

  #escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  #formatDate(isoString) {
    if (!isoString) return 'N/A';
    return new Date(isoString).toLocaleDateString('nl-NL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  #renderUsers(users) {
    if (!users || users.length === 0) {
      this.#dom.usersList.innerHTML =
        '<div class="posts-empty">No users found.</div>';
      return;
    }

    this.#dom.usersList.innerHTML = users
      .map(
        (user) => `
        <div class="admin-user-card">
          <div class="admin-user-info">
            <span class="admin-user-name">${this.#escapeHtml(user.user)}</span>
            <span class="admin-user-meta">Joined: ${this.#formatDate(user.createdAt)} · Last login: ${this.#formatDate(user.lastLogin)}</span>
          </div>
          <button class="btn btn-danger btn-small admin-delete-user-btn" data-name="${this.#escapeHtml(user.user)}">Delete</button>
        </div>
      `
      )
      .join('');
  }

  #renderPosts(posts) {
    if (!posts || posts.length === 0) {
      this.#dom.postsList.innerHTML =
        '<div class="posts-empty">No posts found.</div>';
      return;
    }

    const sorted = [...posts].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    this.#dom.postsList.innerHTML = sorted
      .map((post) => {
        const preview =
          post.text.length > 120
            ? renderMarkdown(this.#escapeHtml(post.text.slice(0, 120))) +
              '&hellip;'
            : renderMarkdown(this.#escapeHtml(post.text));
        return `
        <div class="admin-post-card">
          <div class="admin-post-info">
            <div class="admin-post-header">
              <span class="admin-post-author">${this.#escapeHtml(post.user)}</span>
              <span class="admin-post-meta">#${post.id} · ${this.#formatDate(post.timestamp)}</span>
            </div>
            <div class="admin-post-text">${preview}</div>
          </div>
          <button class="btn btn-danger btn-small admin-delete-post-btn" data-id="${post.id}">Delete</button>
        </div>
      `;
      })
      .join('');
  }

  update(state) {
    if (state.users) {
      this.#renderUsers(state.users);
    }

    if (state.posts) {
      this.#renderPosts(state.posts);
    }

    if (state.error) {
      this.#dom.errorSlot.innerHTML = `
        <div class="error-banner">
          <span>${state.error}</span>
          <button class="error-close-btn" type="button">&times;</button>
        </div>
      `;
      this.#dom.errorSlot
        .querySelector('.error-close-btn')
        .addEventListener('click', () => {
          this.#dom.errorSlot.innerHTML = '';
        });
    } else {
      this.#dom.errorSlot.innerHTML = '';
    }

    if (state.success) {
      this.#dom.successSlot.innerHTML = `
        <div class="success-banner">
          <span>${state.success}</span>
          <button class="success-close-btn" type="button">&times;</button>
        </div>
      `;
      this.#dom.successSlot
        .querySelector('.success-close-btn')
        .addEventListener('click', () => {
          this.#dom.successSlot.innerHTML = '';
        });
    } else {
      this.#dom.successSlot.innerHTML = '';
    }
  }
}
