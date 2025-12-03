import {
  handleDrawCardsSuccess,
  handleError,
  handleNewDeckSuccess,
  handleShuffleSuccess,
  initializeUI,
} from './ui.js';

const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

/**
 * Creates a new shuffled deck of cards
 * @param {object} state - The application state object
 */
async function createNewDeck(state) {
  try {
    // TODO Complete the URL to create a new shuffled deck
    const response = await fetch(`${API_BASE_URL}/...`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    state.deckId = data.deck_id;
    handleNewDeckSuccess(data);
    console.log('New deck created:', data);
  } catch (error) {
    console.error('Error creating deck:', error);
    handleError('Failed to create a new deck. Please try again.');
  }
}

/**
 * Draws cards from the current deck
 * @param {object} state - The application state object
 * @param {number} count - Number of cards to draw
 */
async function drawCards(state, count) {
  if (!state.deckId) {
    handleError('Please create a new deck first!');
    return;
  }

  try {
    // TODO Complete the URL to draw cards
    const response = await fetch(`${API_BASE_URL}/...`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    handleDrawCardsSuccess(data);
    console.log('Cards drawn:', data);
  } catch (error) {
    console.error('Error drawing cards:', error);
    handleError('Failed to draw cards. Please try again.');
  }
}

/**
 * Shuffles the current deck
 * @param {object} state - The application state object
 */
async function shuffleDeck(state) {
  if (!state.deckId) {
    handleError('Please create a new deck first!');
    return;
  }

  try {
    // TODO Complete the URL to shuffle the deck
    const response = await fetch(`${API_BASE_URL}/...`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    handleShuffleSuccess(data);
    console.log('Deck shuffled:', data);
  } catch (error) {
    console.error('Error shuffling deck:', error);
    handleError('Failed to shuffle deck. Please try again.');
  }
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
