const txtEmail = document.getElementById("txtEmail"); // Gets the HTML input element with the ID "txtEmail"
const msgFeedback = document.getElementById("newsletterFeedback"); // Gets the HTML div element with the ID "newsletterFeedback"

function registerEmail() {
    let email = txtEmail.value; // Retrieves the current value (text) from the email input field
    msgFeedback.innerHTML = `The email ${email} was successfully registered.`; // Updates the HTML content of the feedback message div
}

// To make this function actually run, you'd typically attach it to an event listener,
// for example, a button click. For instance:
// document.getElementById("btn").addEventListener("click", registerEmail);

