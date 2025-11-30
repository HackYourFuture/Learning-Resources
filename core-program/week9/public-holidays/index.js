import {
  handleError,
  handleLoadHolidaysSuccess,
  initializeUI,
} from './page.js';

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
  getRequest(
    `https://date.nager.at/api/v3/publicholidays/${year}/NL`,
    (data) => {
      handleLoadHolidaysSuccess(data);
      console.log('Holidays loaded:', data);
    },
    (error) => {
      console.error('Error fetching data:', error);
      handleError('Failed to load holidays. Please try again later.');
    }
  );
}

/**
 * Main function to initialize the application
 */
function main() {
  // Initialize UI and set up event listeners
  initializeUI(loadHolidays);

  console.log('Public Holidays API Demo initialized');
  console.log('API Documentation: https://date.nager.at/');
}

window.addEventListener('load', main);
