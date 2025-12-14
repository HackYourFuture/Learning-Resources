function getRequest(url, onSuccess, onError) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = JSON.parse(xhr.responseText);
        onSuccess(data);
      } catch (error) {
        onError(new Error('Failed to parse JSON response'));
      }
    } else {
      onError(new Error(`HTTP error! status: ${xhr.status}`));
    }
  };

  xhr.onerror = function () {
    onError(new Error('Network error occurred'));
  };

  xhr.send();
}

export function loadHolidays(year, ui) {
  getRequest(
    `<url>`, //TODO: Replace <url> with the actual API endpoint
    (data) => {
      // TODO: Handle successful data retrieval
    },
    (error) => {
      // TODO: Handle errors
    }
  );
}
