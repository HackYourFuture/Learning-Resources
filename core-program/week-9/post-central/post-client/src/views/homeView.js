import getElementsWithIds from '../lib/getElementsWithIds.js';
import renderMarkdown from '../lib/markdown.js';
import BaseView from './baseView.js';

export default class HomeView extends BaseView {
  #props;
  #dom;
  #editingPostId = null;
  #lastPosts = [];
  #pendingDeleteId = null;

  constructor(props) {
    super('div');
    this.#props = props;
    this.root.innerHTML = String.raw`
      <div class="app-layout">
        <header class="header">
          <div class="container header-inner">
            <span class="header-title">Post Central Client</span>
            <div class="header-right">
              <span id="username" class="header-user"></span>
              <button id="adminBtn" class="btn btn-secondary btn-small hidden">Admin</button>
              <button id="logoutBtn" class="btn btn-secondary btn-small">Logout</button>
            </div>
          </div>
        </header>

        <div class="container">
          <div id="errorSlot"></div>
        </div>

        <main class="main-content">
          <div class="container">
            <form id="createPostForm" class="create-post-form">
              <textarea
                id="postText"
                class="post-textarea"
                placeholder="What's on your mind?"
                rows="3"
                required
              ></textarea>
              <button type="submit" class="btn btn-primary">Post</button>
              <p class="markdown-hint">Supports **bold**, *italic*, ~~strikethrough~~, and &#96;code&#96;</p>
            </form>

            <div id="postsList" class="posts-list"></div>
          </div>
        </main>

        <dialog id="confirmDialog" class="confirm-dialog">
          <form method="dialog">
            <p class="confirm-dialog-message">Delete this post?</p>
            <div class="confirm-dialog-actions">
              <button value="cancel" class="btn btn-secondary btn-small">Cancel</button>
              <button value="confirm" class="btn btn-danger btn-small">Delete</button>
            </div>
          </form>
        </dialog>
      </div>
    `;

    this.#dom = getElementsWithIds(this.root);

    this.#dom.adminBtn.addEventListener('click', this.#onAdmin);
    this.#dom.logoutBtn.addEventListener('click', this.#onLogout);
    this.#dom.createPostForm.addEventListener('submit', this.#onCreatePost);
    this.#dom.postsList.addEventListener('click', this.#onPostAction);
    this.#dom.confirmDialog.addEventListener('close', this.#onDialogClose);
  }

  #onAdmin = (e) => {
    e.preventDefault();
    this.#props.onAdmin();
  };

  #onLogout = (e) => {
    e.preventDefault();
    this.#props.onLogout();
  };

  #onCreatePost = (e) => {
    e.preventDefault();
    const text = this.#dom.postText.value.trim();
    if (text) {
      this.#props.onCreatePost(text);
      this.#dom.postText.value = '';
    }
  };

  #onPostAction = (e) => {
    const editBtn = e.target.closest('.edit-btn');
    const deleteBtn = e.target.closest('.delete-btn');
    const saveBtn = e.target.closest('.save-btn');
    const cancelBtn = e.target.closest('.cancel-btn');

    if (editBtn) {
      this.#editingPostId = parseInt(editBtn.dataset.id);
      this.#renderPosts(this.#lastPosts);
    } else if (deleteBtn) {
      this.#pendingDeleteId = parseInt(deleteBtn.dataset.id);
      this.#showDialogNear(deleteBtn);
    } else if (saveBtn) {
      const textarea = this.#dom.postsList.querySelector('.edit-textarea');
      if (textarea) {
        this.#props.onEditPost(parseInt(saveBtn.dataset.id), textarea.value);
        this.#editingPostId = null;
      }
    } else if (cancelBtn) {
      this.#editingPostId = null;
      this.#renderPosts(this.#lastPosts);
    }
  };

  #showDialogNear(anchor) {
    const dialog = this.#dom.confirmDialog;
    dialog.showModal();

    // Position near the anchor button if it fits, otherwise stay centered.
    const btnRect = anchor.getBoundingClientRect();
    const dlgRect = dialog.getBoundingClientRect();

    const top = btnRect.bottom + 8;
    const left = btnRect.left + btnRect.width / 2 - dlgRect.width / 2;

    const fitsBelow = top + dlgRect.height < window.innerHeight - 16;
    const fitsHorizontally =
      left > 16 && left + dlgRect.width < window.innerWidth - 16;

    if (fitsBelow && fitsHorizontally) {
      dialog.style.margin = '0';
      dialog.style.insetBlockStart = `${top}px`;
      dialog.style.insetInlineStart = `${left}px`;
    }
  }

  #onDialogClose = () => {
    // Reset any manual positioning so the next open starts fresh.
    const dialog = this.#dom.confirmDialog;
    dialog.style.margin = '';
    dialog.style.insetBlockStart = '';
    dialog.style.insetInlineStart = '';

    if (dialog.returnValue === 'confirm' && this.#pendingDeleteId != null) {
      this.#props.onDeletePost(this.#pendingDeleteId);
    }
    this.#pendingDeleteId = null;
  };

  #escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  #formatTimestamp(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHr = Math.floor(diffMs / 3600000);

    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHr < 24) return `${diffHr}h ago`;

    return date.toLocaleDateString('nl-NL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  #renderPost(post) {
    const isEditing = this.#editingPostId === post.id;
    const timestamp = this.#formatTimestamp(post.timestamp);
    const editedBadge = post.isEdited
      ? '<span class="post-edited">edited</span>'
      : '';

    if (isEditing) {
      return `
        <article class="post-item" data-post-id="${post.id}">
          <div class="post-header">
            <span class="post-timestamp">${timestamp}</span>
            ${editedBadge}
          </div>
          <textarea class="edit-textarea">${this.#escapeHtml(post.text)}</textarea>
          <div class="edit-actions">
            <button class="btn btn-small btn-primary save-btn" data-id="${post.id}">Save</button>
            <button class="btn btn-small btn-secondary cancel-btn" data-id="${post.id}">Cancel</button>
          </div>
        </article>
      `;
    }

    return `
      <article class="post-item" data-post-id="${post.id}">
        <div class="post-header">
          <span class="post-timestamp">${timestamp}</span>
          ${editedBadge}
        </div>
        <div class="post-body">
          <p class="post-text">${renderMarkdown(this.#escapeHtml(post.text))}</p>
        </div>
        <div class="post-actions">
          <button class="btn btn-small btn-secondary edit-btn" data-id="${post.id}">Edit</button>
          <button class="btn btn-small btn-danger delete-btn" data-id="${post.id}">Delete</button>
        </div>
      </article>
    `;
  }

  #renderPosts(posts) {
    if (!posts || posts.length === 0) {
      this.#dom.postsList.innerHTML =
        '<div class="posts-empty">No posts yet. Write your first post above.</div>';
      return;
    }

    // Sort newest first
    const sorted = [...posts].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    this.#dom.postsList.innerHTML = sorted
      .map((post) => this.#renderPost(post))
      .join('');
  }

  update(state) {
    if (state.user) {
      this.#dom.username.textContent = state.user;
    }

    if (state.role === 'admin') {
      this.#dom.adminBtn.classList.remove('hidden');
    }

    if (state.posts) {
      this.#lastPosts = state.posts;
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
  }
}
