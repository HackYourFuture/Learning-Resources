import {
  handleDrawCardsSuccess,
  handleError,
  handleNewDeckSuccess,
  handleShuffleSuccess,
  initializeUI,
} from './page.js';

const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

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
 * Creates a new shuffled deck of cards
 * @param {object} state - The application state object
 */
function createNewDeck(state) {
  getRequest(
    `${API_BASE_URL}/new/shuffle/?deck_count=1`,
    (data) => {
      state.deckId = data.deck_id;
      handleNewDeckSuccess(data);
      console.log('New deck created:', data);
    },
    (error) => {
      console.error('Error creating deck:', error);
      handleError('Failed to create a new deck. Please try again.');
    }
  );
}

/**
 * Draws cards from the current deck
 * @param {object} state - The application state object
 * @param {number} count - Number of cards to draw
 */
function drawCards(state, count) {
  if (!state.deckId) {
    handleError('Please create a new deck first!');
    return;
  }

  getRequest(
    `${API_BASE_URL}/${state.deckId}/draw/?count=${count}`,
    (data) => {
      handleDrawCardsSuccess(data);
      console.log('Cards drawn:', data);
    },
    (error) => {
      console.error('Error drawing cards:', error);
      handleError('Failed to draw cards. Please try again.');
    }
  );
}

/**
 * Shuffles the current deck
 * @param {object} state - The application state object
 */
function shuffleDeck(state) {
  if (!state.deckId) {
    handleError('Please create a new deck first!');
    return;
  }

  getRequest(
    `${API_BASE_URL}/${state.deckId}/shuffle/`,
    (data) => {
      handleShuffleSuccess(data);
      console.log('Deck shuffled:', data);
    },
    (error) => {
      console.error('Error shuffling deck:', error);
      handleError('Failed to shuffle deck. Please try again.');
    }
  );
}

/**
 * Main function to initialize the application
 */
function main() {
  // Create application state object
  const state = {
    deckId: null,
  };

  // Initialize UI and set up event listeners
  initializeUI(
    () => createNewDeck(state),
    (count) => drawCards(state, count),
    () => shuffleDeck(state)
  );

  console.log('Deck of Cards API Demo initialized');
  console.log('API Documentation: https://deckofcardsapi.com/');
}

window.addEventListener('load', main);
