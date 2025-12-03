import { handleError, handleLoadHolidaysSuccess, initializeUI } from './ui.js';

/**
 * Performs a GET request to the specified URL.
 * @param {string} url - The URL to send the GET request to.
 * @param {function} onSuccess - Callback function to handle successful response.
 * @param {function} onError - Callback function to handle errors.
 */
function getRequest(url, onSuccess, onError) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => {
      onError(error);
    });
}

/**
 * Loads holidays for a specific year
 * @param {number} year - The year to load holidays for
 */
function loadHolidays(year) {
  // TODO Complete this function to load holidays for the given year
  getRequest(
    `url for endpoint`,
    () => {},
    () => {}
  );
}

/**
 * Main function to initialize the application
 */
function main() {
  // Initialize UI and set up event listeners
  initializeUI(loadHolidays);
}

window.addEventListener('load', main);
