export function createXMLHttpRequest(method, url, successCallback, errorCallback, data = null) {
  const xhr = new XMLHttpRequest();

  xhr.open(method, url);
  // Set the Content-Type header for sending JSON data
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(data); // Send the request body (e.g., for POST/PUT)

  // Assign the event handler for state changes
  xhr.onreadystatechange = checkAjaxStatus;

  /**
   * Internal function to check the XMLHttpRequest status.
   */
  function checkAjaxStatus() {
    // Check if the request is complete (readyState 4)
    if (xhr.readyState === 4) {
      // Check if the HTTP status code indicates success (less than 400)
      if (xhr.status < 400) {
        const json = JSON.parse(xhr.responseText);

        // If a success callback function is provided, call it with the parsed JSON data
        if (typeof successCallback === "function") {
          successCallback(json);
        }
      } else {
        // If the status code indicates an error (400 or higher)
        // and an error callback function is provided, call it with an error message
        if (typeof errorCallback === "function") {
          errorCallback("Something went wrong with the connection.");
        }
      }
    }
  }
}
