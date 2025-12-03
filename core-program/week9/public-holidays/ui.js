/**
 * Formats a date string to a more readable format
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Gets the appropriate CSS class for a holiday type badge
 * @param {string} type - The holiday type
 * @returns {string} CSS class name
 */
function getTypeBadgeClass(type) {
  return type.toLowerCase();
}

/**
 * Creates a holiday card element
 * @param {object} holiday - Holiday data object
 * @returns {HTMLElement} Holiday card element
 */
function createHolidayCard(holiday) {
  const card = document.createElement('div');
  card.className = 'holiday-card';

  const date = document.createElement('div');
  date.className = 'holiday-date';
  date.textContent = formatDate(holiday.date);

  const name = document.createElement('div');
  name.className = 'holiday-name';
  name.textContent = holiday.name;

  const localName = document.createElement('div');
  localName.className = 'holiday-local-name';
  localName.textContent = holiday.localName;

  const typesContainer = document.createElement('div');
  typesContainer.className = 'holiday-types';

  holiday.types.forEach((type) => {
    const badge = document.createElement('span');
    badge.className = `holiday-type-badge ${getTypeBadgeClass(type)}`;
    badge.textContent = type;
    typesContainer.appendChild(badge);
  });

  card.appendChild(date);
  card.appendChild(name);
  card.appendChild(localName);
  card.appendChild(typesContainer);

  return card;
}

/**
 * Populates the year select element with years from 5 years ago to next year
 */
export function populateYearSelect() {
  const yearSelect = document.getElementById('year-select');
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 5;
  const endYear = currentYear + 1;

  for (let year = startYear; year <= endYear; year++) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    if (year === currentYear) {
      option.selected = true;
    }
    yearSelect.appendChild(option);
  }
}

/**
 * Renders holidays to the DOM
 * @param {Array} holidays - Array of holiday objects
 */
export function renderHolidays(holidays) {
  const container = document.getElementById('holidays-container');
  container.innerHTML = '';

  if (holidays.length === 0) {
    container.innerHTML = '<div class="empty-state">No holidays found</div>';
    return;
  }

  holidays.forEach((holiday) => {
    const card = createHolidayCard(holiday);
    container.appendChild(card);
  });
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
function showError(message) {
  const errorElement = document.getElementById('error-message');
  errorElement.textContent = message;
  errorElement.classList.add('active');
  hideLoading();
}

/**
 * Handles successful holidays load
 * @param {Array} data - Array of holiday objects from API
 */
export function handleLoadHolidaysSuccess(data) {
  hideLoading();
  renderHolidays(data);
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
 * @param {function} onLoadHolidays - Callback for loading holidays with year parameter
 */
export function initializeUI(onLoadHolidays) {
  // Populate year select dropdown
  populateYearSelect();

  // Set up load button event listener
  document.getElementById('load-btn').addEventListener('click', () => {
    showLoading();
    const year = document.getElementById('year-select').value;
    onLoadHolidays(year);
  });
}
