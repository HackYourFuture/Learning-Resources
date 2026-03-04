import ObservableState from './lib/observableState.js';
import Router from './lib/router.js';
import { getToken } from './lib/tokenUtils.js';
import routes from './routes.js';

function start() {
  const appRoot = document.getElementById('app-root');

  // Create a DOM element that will serve as the mount point
  // used by the router for loading pages.
  const pageRoot = document.createElement('div');
  pageRoot.id = 'page-root';
  appRoot.appendChild(pageRoot);

  const state = new ObservableState();

  const token = getToken();
  if (token) {
    state.set({ token });
  }

  const router = new Router(state);

  router.initialize(routes, pageRoot);
  router.navigateTo(token ? 'home' : 'login');
  router.start();
}

// Module scripts are deferred, so the DOM is already parsed when this runs.
// Using DOMContentLoaded would fail because loader.js uses top-level await,
// which can cause the event to fire before the module graph finishes evaluating.
start();
