export function createPromise(method, url, data = null) {
  // Create and return a new Promise
  const promise = new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest(); // Instantiate XMLHttpRequest

    xhr.open(method, url); // Configure the request (method and URL)
    // Set the Content-Type header to indicate JSON data
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(data); // Send the request body (e.g., for POST, PUT, DELETE)

    // Assign the event handler for state changes of the XMLHttpRequest
    xhr.onreadystatechange = checkAjaxStatus;

    /**
     * Internal function to check the XMLHttpRequest status and resolve/reject the Promise.
     */
    function checkAjaxStatus() {
      // Check if the request is complete (readyState is 4)
      if (xhr.readyState === 4) {
        // If the HTTP status code indicates success (less than 400)
        if (xhr.status < 400) {
          try {
            const json = JSON.parse(xhr.responseText); // Parse the response text as JSON
            resolve(json); // Resolve the Promise with the parsed JSON data
          } catch (e) {
              // Catch JSON parsing errors
            reject(Error("Failed to parse JSON response: " + e.message));
          }
        } else {
          // If the status code indicates an error (400 or higher)
          reject(Error("Something went wrong with the connection. Status: " + xhr.status)); // Reject the Promise with an error
        }
      }
    }
  });

  console.log(promise); // Log the Promise object (for debugging, optional in production)
  return promise; // Return the Promise
}
