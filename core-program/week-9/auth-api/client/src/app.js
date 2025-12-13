import $state from './lib/observableState.js';
import router from './lib/router.js';
import { getToken } from './lib/tokenUtils.js';
import routes from './routes.js';

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

  router.initialize(routes, pageRoot);
  router.navigateTo(token ? 'home' : 'login');
  router.start();
}

window.addEventListener('DOMContentLoaded', start);
