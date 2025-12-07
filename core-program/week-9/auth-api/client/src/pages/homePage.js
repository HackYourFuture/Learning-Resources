import fetchAndLog from '../util/fetchAndLog.js';
import initializeState from '../util/initializeState.js';
import loadPage from '../util/loadPage.js';
import logger from '../util/logger.js';
import { removeToken } from '../util/tokenUtils.js';
import createHomeView from '../views/homeView.js';
import createLoginPage from './loginPage.js';

function createHomePage(state) {
  const updateView = (updates) => {
    state = { ...state, ...updates };
    logger.debug('state', state);
    view.update(state);
  };

  const onLogout = async () => {
    removeToken();

    // reset state
    state = initializeState();

    try {
      const response = await fetchAndLog('/user/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`Logout failed. Reason: HTTP ${response.status}`);
      }

      loadPage(createLoginPage, state);
    } catch (error) {
      state = { ...state, error: error.message };
      updateView(state);
    }
  };

  const getProfile = async () => {
    try {
      const response = await fetchAndLog('/user/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        state = { ...state, error: data.message };
        logger.debug('state', state);
        removeToken();
        state = initializeState();
        loadPage(createLoginPage, state);
        return;
      }

      updateView({ profile: data.message });
    } catch (error) {
      state = { ...state, error: error.message };
      updateView(state);
    }
  };

  const view = createHomeView({ onLogout });
  getProfile();

  return view;
}

export default createHomePage;
