import routes from './routes.js';
import initializeState from './util/initializeState.js';
import router from './util/router.js';

function loadApp() {
  const appRoot = document.getElementById('app-root');

  // Create a DOM element that will serve as the mount point
  // used by the router for loading paging.
  const pageRoot = document.createElement('div');
  pageRoot.id = 'page-root';
  appRoot.appendChild(pageRoot);

  const state = initializeState();

  router.initialize(routes, pageRoot);
  router.navigateTo(state.token ? 'home' : 'login');
  router.start(state);
}

window.addEventListener('DOMContentLoaded', loadApp);
