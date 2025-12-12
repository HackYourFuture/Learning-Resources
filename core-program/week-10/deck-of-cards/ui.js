import { fetchDrawCards, fetchNewDeck, fetchShuffleDeck } from './services.js';

export default class UI {
  constructor() {
    this.state = { deckId: null };
    this.dom = this.getElementsWithIds(document);
  }

  initialize() {
    this.disableButtons();

    // Set up event listeners
    this.dom.newDeckBtn.addEventListener('click', () => {
      this.createNewDeck();
    });

    this.dom.drawCardBtn.addEventListener('click', () => {
      this.drawCards(1);
    });

    this.dom.drawFiveBtn.addEventListener('click', () => {
      this.drawCards(5);
    });

    this.dom.shuffleBtn.addEventListener('click', () => {
      this.shuffleDeck();
    });
  }

  getElementsWithIds(root) {
    const elements = root.querySelectorAll('[id]');
    return Array.from(elements).reduce((obj, element) => {
      const name = element.id
        .split('-')
        .map((part, index) => {
          if (index === 0) return part;
          return part.charAt(0).toUpperCase() + part.slice(1);
        })
        .join('');
      obj[name] = element;
      return obj;
    }, {});
  }

  createCardElement(card) {
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

  updateDeckInfo(remaining) {
    const cardsRemainingElement = this.dom.cardsRemaining;

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

  renderCards(cards) {
    const container = this.dom.cardsContainer;
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
      const cardElement = this.createCardElement(card);
      cardsGrid.appendChild(cardElement);
    });

    container.appendChild(cardsGrid);
  }

  showLoading() {
    this.dom.loading.classList.add('active');
    this.dom.errorMessage.classList.remove('active');
  }

  hideLoading() {
    this.dom.loading.classList.remove('active');
  }

  showError(message) {
    const errorElement = this.dom.errorMessage;
    errorElement.textContent = message;
    errorElement.classList.add('active');
    this.hideLoading();
  }

  enableButtons() {
    this.dom.drawCardBtn.disabled = false;
    this.dom.drawFiveBtn.disabled = false;
    this.dom.shuffleBtn.disabled = false;
  }

  disableButtons() {
    this.dom.drawCardBtn.disabled = true;
    this.dom.drawFiveBtn.disabled = true;
    this.dom.shuffleBtn.disabled = true;
  }

  showToast(message) {
    const toastElement = this.dom.toast;
    toastElement.textContent = message;
    toastElement.classList.add('active');

    // Auto-hide after 2 seconds
    setTimeout(() => {
      toastElement.classList.remove('active');
    }, 2000);
  }

  async createNewDeck() {
    try {
      this.showLoading();
      const data = await fetchNewDeck();

      this.state.deckId = data.deck_id;

      this.updateDeckInfo(data.remaining);
      this.enableButtons();
      this.renderCards([]); // Clear any existing cards
      this.showToast('✅ New deck created and shuffled!');
      console.log('New deck created:', data);
    } catch (error) {
      console.error('Error creating deck:', error);
      this.showError('Failed to create a new deck. Please try again.');
    } finally {
      this.hideLoading();
    }
  }

  async drawCards(count) {
    if (!this.state.deckId) {
      this.showError('Please create a new deck first!');
      return;
    }

    try {
      this.showLoading();
      const data = await fetchDrawCards(this.state.deckId, count);

      this.updateDeckInfo(data.remaining);
      this.renderCards(data.cards);
      console.log('Cards drawn:', data);
      if (data.remaining === 0) {
        this.showError(
          'No more cards in the deck! Create a new deck to continue.'
        );
      }
    } catch (error) {
      console.error('Error drawing cards:', error);
      this.showError('Failed to draw cards. Please try again.');
    } finally {
      this.hideLoading();
    }
  }

  async shuffleDeck() {
    if (!this.state.deckId) {
      this.showError('Please create a new deck first!');
      return;
    }

    try {
      this.showLoading();
      const data = await fetchShuffleDeck(this.state.deckId);

      this.updateDeckInfo(data.remaining);
      this.renderCards([]); // Clear cards after shuffle
      this.showToast('🔀 Deck shuffled successfully!');
      console.log('Deck shuffled:', data);
    } catch (error) {
      console.error('Error shuffling deck:', error);
      this.showError('Failed to shuffle deck. Please try again.');
    } finally {
      this.hideLoading();
    }
  }
}
