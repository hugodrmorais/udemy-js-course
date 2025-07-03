(function () {
    const userName = "Hugo"; // Variable to hold the user's name (currently null, meaning no user is logged in or provided)
    const element = document.querySelector(".top-bar p"); // Selects the first <p> element within an element with the class "top-bar"

    if (userName) { // Checks if userName has a truthy value (i.e., not null, undefined, 0, false, or an empty string)
        // document.querySelector(".top-bar p").textContent = "Welcome, " + userName; // Alternative way to update text content

        console.log(element.textContent); // Logs the current text content of the selected element (e.g., "Welcome, ")
        // element.textContent = element.textContent + userName; // Another way to append text
        element.innerHTML += "<b>" + userName + "</b>"; // Appends the user name, wrapped in bold tags, to the element's HTML content
    } else { // If userName is null or any other falsy value
        // element.parentElement.style.display = "none"; // Option 1: Hide the parent element (the entire top bar)
        // element.remove(); // Option 2: Remove the <p> element itself
        const elementToRemove = element.parentElement; // Gets the parent element of the <p> (which is the .top-bar div)
        elementToRemove.parentElement.removeChild(elementToRemove); // Removes the .top-bar div from its parent (the <header> in your HTML)
    }

    console.log(element); // Logs the 'element' variable. Note: If 'element' or its parent was removed from the DOM, this will still log the reference to the element object, but it won't be part of the live document.

})(); // The immediately invoked function expression (IIFE)
