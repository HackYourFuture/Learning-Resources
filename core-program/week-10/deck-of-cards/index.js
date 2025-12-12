import UI from './ui.js';

/**
 * Main function to initialize the application
 */
function main() {
  const ui = new UI();
  ui.initialize();

  console.log('Deck of Cards API Demo initialized');
  console.log('API Documentation: https://deckofcardsapi.com/');
}

window.addEventListener('load', main);
