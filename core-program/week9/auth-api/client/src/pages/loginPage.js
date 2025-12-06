import fetchAndLog from '../util/fetchAndLog.js';
import loadPage from '../util/loadPage.js';
import logger from '../util/logger.js';
import { putToken } from '../util/tokenUtils.js';
import createLoginView from '../views/loginView.js';
import createHomePage from './homePage.js';
import createRegisterPage from './registerPage.js';

function createLoginPage(state) {
  const updateView = (updates) => {
    state = { ...state, ...updates };
    logger.debug('state', state);
    view.update(state);
  };

  const onSubmit = async (username, password) => {
    try {
      const response = await fetchAndLog('/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      putToken(data.token);
      state = { ...state, token: data.token, error: null };

      loadPage(createHomePage, state);
    } catch (error) {
      state = { ...state, error: error.message };
      updateView(state);
    }
  };

  const onRegister = () => {
    loadPage(createRegisterPage, state);
  };

  const view = createLoginView({ onSubmit, onRegister });

  return view;
}

export default createLoginPage;
