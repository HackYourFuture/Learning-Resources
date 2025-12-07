/**
 * Creates a card element
 * @param {object} card - Card data object from API
 * @returns {HTMLElement} Card element
 */
function createCardElement(card) {
  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner';
  cardInner.style.cursor = 'pointer';

  // Front of card (shows the image from API)
  const cardFront = document.createElement('div');
  cardFront.className = 'card-face card-front';

  const cardImage = document.createElement('img');
  cardImage.src = card.image;
  cardImage.alt = `${card.value} of ${card.suit}`;
  cardImage.className = 'card-image';

  cardFront.appendChild(cardImage);

  // Back of card
  const cardBack = document.createElement('div');
  cardBack.className = 'card-face card-back';

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);

  // Add flip animation on click
  cardInner.addEventListener('click', () => {
    cardInner.classList.toggle('flipped');
  });

  return cardInner;
}

/**
 * Updates the deck information display
 * @param {number} remaining - Number of cards remaining
 */
export function updateDeckInfo(remaining) {
  const cardsRemainingElement = document.getElementById('cards-remaining');

  cardsRemainingElement.textContent = remaining;

  // Add color coding for remaining cards
  if (remaining === 0) {
    cardsRemainingElement.style.color = '#e53e3e';
  } else if (remaining < 10) {
    cardsRemainingElement.style.color = '#dd6b20';
  } else {
    cardsRemainingElement.style.color = '#38a169';
  }
}

/**
 * Renders cards to the DOM
 * @param {Array} cards - Array of card objects
 */
export function renderCards(cards) {
  const container = document.getElementById('cards-container');
  container.innerHTML = '';

  if (cards.length === 0) {
    return;
  }

  const heading = document.createElement('h2');
  heading.className = 'cards-heading';
  heading.textContent = `Drawn Cards (${cards.length})`;
  container.appendChild(heading);

  const cardsGrid = document.createElement('div');
  cardsGrid.className = 'cards-grid';

  cards.forEach((card) => {
    const cardElement = createCardElement(card);
    cardsGrid.appendChild(cardElement);
  });

  container.appendChild(cardsGrid);
}

/**
 * Shows the loading indicator
 */
export function showLoading() {
  document.getElementById('loading').classList.add('active');
  document.getElementById('error-message').classList.remove('active');
}

/**
 * Hides the loading indicator
 */
export function hideLoading() {
  document.getElementById('loading').classList.remove('active');
}

/**
 * Shows an error message
 * @param {string} message - Error message to display
 */
export function showError(message) {
  const errorElement = document.getElementById('error-message');
  errorElement.textContent = message;
  errorElement.classList.add('active');
  hideLoading();
}

/**
 * Enables action buttons
 */
export function enableButtons() {
  document.getElementById('draw-card-btn').disabled = false;
  document.getElementById('draw-five-btn').disabled = false;
  document.getElementById('shuffle-btn').disabled = false;
}

/**
 * Disables action buttons
 */
export function disableButtons() {
  document.getElementById('draw-card-btn').disabled = true;
  document.getElementById('draw-five-btn').disabled = true;
  document.getElementById('shuffle-btn').disabled = true;
}

/**
 * Shows a toast notification
 * @param {string} message - Toast message to display
 */
function showToast(message) {
  const toastElement = document.getElementById('toast');
  toastElement.textContent = message;
  toastElement.classList.add('active');

  // Auto-hide after 2 seconds
  setTimeout(() => {
    toastElement.classList.remove('active');
  }, 2000);
}

/**
 * Handles successful new deck creation
 * @param {object} data - API response data
 */
export function handleNewDeckSuccess(data) {
  hideLoading();
  updateDeckInfo(data.remaining);
  enableButtons();
  renderCards([]); // Clear any existing cards
  showToast('✅ New deck created and shuffled!');
}

/**
 * Handles successful card draw
 * @param {object} data - API response data
 */
export function handleDrawCardsSuccess(data) {
  hideLoading();
  updateDeckInfo(data.remaining);
  renderCards(data.cards);

  if (data.remaining === 0) {
    showError('No more cards in the deck! Create a new deck to continue.');
  }
}

/**
 * Handles successful deck shuffle
 * @param {object} data - API response data
 */
export function handleShuffleSuccess(data) {
  hideLoading();
  updateDeckInfo(data.remaining);
  renderCards([]); // Clear cards after shuffle
  showToast('🔀 Deck shuffled successfully!');
}

/**
 * Handles errors from API calls
 * @param {string} message - Error message to display
 */
export function handleError(message) {
  hideLoading();
  showError(message);
}

/**
 * Initializes the UI and sets up event listeners
 * @param {function} onNewDeck - Callback for creating a new deck
 * @param {function} onDrawCards - Callback for drawing cards
 * @param {function} onShuffle - Callback for shuffling deck
 */
export function initializeUI(onNewDeck, onDrawCards, onShuffle) {
  // Show loading for initial setup
  showLoading();
  disableButtons();

  // Set up event listeners
  document.getElementById('new-deck-btn').addEventListener('click', () => {
    showLoading();
    onNewDeck();
  });

  document.getElementById('draw-card-btn').addEventListener('click', () => {
    showLoading();
    onDrawCards(1);
  });

  document.getElementById('draw-five-btn').addEventListener('click', () => {
    showLoading();
    onDrawCards(5);
  });

  document.getElementById('shuffle-btn').addEventListener('click', () => {
    showLoading();
    onShuffle();
  });

  // Hide loading after setup
  hideLoading();
}
