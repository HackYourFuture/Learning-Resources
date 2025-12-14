import $state from './lib/observableState.js';
import Router from './lib/router.js';
import { getToken } from './lib/tokenUtils.js';
import routes from './routes.js';
import ObservableState from './lib/observableState.js';

function start() {
  const appRoot = document.getElementById('app-root');

  // Create a DOM element that will serve as the mount point
  // used by the router for loading paging.
  const pageRoot = document.createElement('div');
  pageRoot.id = 'page-root';
  appRoot.appendChild(pageRoot);

  const token = getToken();
  if (token) {
    $state.set({ token });
  }

  const state = new ObservableState();
  const router = new Router(state);

  router.initialize(routes, pageRoot);
  router.navigateTo(token ? 'home' : 'login');
  router.start();
}

window.addEventListener('DOMContentLoaded', start);
