export function createFetch(method, url, body = null) {
  /**
   * Handles potential HTTP errors in the fetch response.
   * Throws an error if the response status is not OK (i.e., status >= 400).
   * @param {Response} response - The fetch API Response object.
   * @returns {Response} The original response if it's OK.
   * @throws {Error} If the response is not OK.
   */
  function handleError(response) {
    if (!response.ok) { // 'response.ok' is true if the HTTP status code is in the 200-299 range
      throw Error(`${response.status}: ${response.statusText}`);
    }
    return response;
  }

  // Perform the fetch request
  return fetch(url, {
    method, // HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE')
    body,   // Request body (for methods like POST, PUT)
    headers: {
      "Content-Type": "application/json;charset=UTF-8" // Specify JSON content type
    }
  })
  // First .then() to call the error handler
  .then(response => handleError(response))
  // Second .then() to parse the response body as JSON
  .then(response => response.json());
}
