import WebSocketClient from '../lib/websocket.js';
import DashboardView from '../views/dashboardView.js';

export default class DashboardPage {
  #state;
  #view;
  #wsClient;
  #audioCtx;
  #pingBuffer;

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
      onStatusChange: (status) => state.update({ connectionStatus: status }),
    });

    // Create AudioContext early; browsers suspend it until a user gesture
    this.#audioCtx = new AudioContext();
    this.#showAudioBanner();

    // Pre-load notification sound
    fetch('/portal/public/notification.wav')
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

    if (post.user === 'admin' && post.isNew !== false) {
      this.#playPing();
    }
  }

  #playPing() {
    const ctx = this.#audioCtx;
    if (ctx.state === 'suspended' || !this.#pingBuffer) return;

    const source = ctx.createBufferSource();
    source.buffer = this.#pingBuffer;
    source.connect(ctx.destination);
    source.start();
  }

  #showAudioBanner() {
    const banner = document.createElement('div');
    banner.className = 'audio-banner';
    banner.innerHTML =
      '<span>Click to enable notification sounds for admin posts</span>' +
      '<button class="audio-banner-dismiss" aria-label="Dismiss">&times;</button>';

    banner.addEventListener('click', () => {
      this.#audioCtx.resume();
      banner.remove();
    });

    setTimeout(() => {
      banner.classList.add('fade-out');
      banner.addEventListener('animationend', () => banner.remove());
    }, 3000);

    const header = document.querySelector('.header');
    header.insertAdjacentElement('afterend', banner);
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
  }
}
