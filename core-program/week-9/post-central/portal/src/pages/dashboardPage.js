import WebSocketClient from '../lib/websocket.js';
import DashboardView from '../views/dashboardView.js';

export default class DashboardPage {
  #state;
  #view;
  #wsClient;
  #audioCtx;
  #pingBuffer;
  #soundEnabled = false;
  #soundCheckbox;

  constructor({ state, container }) {
    this.#state = state;

    state.set({
      posts: [],
      users: [],
      connectionStatus: 'connecting',
      lastAction: null,
    });

    this.#view = new DashboardView(container);

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host || 'localhost:3000';

    this.#wsClient = new WebSocketClient(`${protocol}//${host}`, {
      onMessage: (message) => this.#handleMessage(message),
      onStatusChange: (status) => {
        // Clear posts on reconnect so the server's full post list
        // doesn't duplicate what's already in state.
        if (status === 'connected') {
          state.update({ posts: [], connectionStatus: status });
        } else {
          state.update({ connectionStatus: status });
        }
      },
    });

    this.#audioCtx = new AudioContext();
    this.#setupSoundCheckbox();

    // Pre-load notification sound
    fetch('/public/notification.wav')
      .then((res) => res.arrayBuffer())
      .then((buf) => this.#audioCtx.decodeAudioData(buf))
      .then((decoded) => {
        this.#pingBuffer = decoded;
      });
  }

  mount() {
    this.#state.subscribe(this.#view);
    this.#view.update(this.#state.get());
    this.#wsClient.connect();
  }

  destroy() {
    this.#state.unsubscribe(this.#view);
    this.#wsClient.disconnect();
    this.#audioCtx.close();
    this.#view.destroy();
  }

  #handleMessage(message) {
    const { type, data } = message;

    switch (type) {
      case 'post:create':
        this.#handlePostCreate(data);
        break;
      case 'post:update':
        this.#handlePostUpdate(data);
        break;
      case 'post:delete':
        this.#handlePostDelete(data);
        break;
      case 'user:register':
        this.#handleUserRegister(data);
        break;
      case 'user:login':
        this.#handleUserLogin(data);
        break;
      case 'user:delete':
        this.#handleUserDelete(data);
        break;
      default:
        console.warn('Unknown message type:', type);
    }
  }

  #handlePostCreate(post) {
    const { posts } = this.#state.get();

    const postWithTimestamp = {
      ...post,
      timestamp: post.timestamp || new Date().toISOString(),
      isNew: post.isNew !== false,
    };

    this.#state.update({
      posts: [postWithTimestamp, ...posts],
      lastAction: { type: 'post:create', post: postWithTimestamp },
    });
    queueMicrotask(() => this.#state.update({ lastAction: null }));

    // Clear the isNew flag after the highlight animation finishes (2s)
    // so it doesn't replay on every timestamp-refresh re-render.
    if (postWithTimestamp.isNew) {
      setTimeout(() => {
        const { posts: currentPosts } = this.#state.get();
        this.#state.update({
          posts: currentPosts.map((p) =>
            p.id === postWithTimestamp.id ? { ...p, isNew: false } : p
          ),
        });
      }, 2000);
    }

    if (postWithTimestamp.isNew) {
      this.#playPing();
    }
  }

  #playPing() {
    if (!this.#soundEnabled || !this.#pingBuffer) return;

    const ctx = this.#audioCtx;
    if (ctx.state === 'suspended') return;

    const source = ctx.createBufferSource();
    source.buffer = this.#pingBuffer;
    source.connect(ctx.destination);
    source.start();
  }

  #setupSoundCheckbox() {
    this.#soundCheckbox = document.getElementById('sound-checkbox');
    this.#soundCheckbox.addEventListener('change', () => {
      this.#soundEnabled = this.#soundCheckbox.checked;
      if (this.#soundEnabled) {
        this.#audioCtx.resume();
      }
    });
  }

  #handlePostUpdate(updatedPost) {
    const { posts } = this.#state.get();

    const updatedPosts = posts.map((post) =>
      post.id === updatedPost.id
        ? { ...updatedPost, timestamp: updatedPost.timestamp, isEdited: true }
        : post
    );

    this.#state.update({
      posts: updatedPosts,
      lastAction: { type: 'post:update', post: updatedPost },
    });
    queueMicrotask(() => this.#state.update({ lastAction: null }));
  }

  #handlePostDelete(deletedPost) {
    const { posts } = this.#state.get();

    const updatedPosts = posts.map((post) =>
      post.id === deletedPost.id ? { ...post, isDeleted: true } : post
    );

    this.#state.update({
      posts: updatedPosts,
      lastAction: { type: 'post:delete', post: deletedPost },
    });
    queueMicrotask(() => this.#state.update({ lastAction: null }));
  }

  #handleUserRegister(user) {
    const { users } = this.#state.get();

    this.#state.update({
      users: [...users, user],
      lastAction: { type: 'user:register', user },
    });
    queueMicrotask(() => this.#state.update({ lastAction: null }));
    this.#playPing();
  }

  #handleUserLogin(user) {
    const { users } = this.#state.get();

    const userExists = users.some((u) => u.user === user.user);
    const updatedUsers = userExists ? users : [...users, user];

    this.#state.update({
      users: updatedUsers,
      lastAction: { type: 'user:login', user },
    });
    queueMicrotask(() => this.#state.update({ lastAction: null }));
    this.#playPing();
  }

  #handleUserDelete(deletedUser) {
    const { users, posts } = this.#state.get();

    const updatedUsers = users.filter((user) => user.user !== deletedUser.user);
    const updatedPosts = posts.filter((post) => post.user !== deletedUser.user);

    this.#state.update({
      users: updatedUsers,
      posts: updatedPosts,
      lastAction: { type: 'user:delete', user: deletedUser },
    });
    queueMicrotask(() => this.#state.update({ lastAction: null }));
    this.#playPing();
  }
}
