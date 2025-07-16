// Import necessary modules (assuming these are ES Modules)
import TasksService from './Service/Tasks.service.js';
import TaskController from './Controller/Tasks.controller.js';
import TasksView from './View/Tasks.View.js';

// --- Initialization ---

// Create an instance of the TasksService
const taskService = new TasksService();

// Get the UL element where tasks will be displayed
const ul = document.getElementById("todo-list");

// Create an instance of TasksView, passing the UL element
const tasksView = new TasksView(ul);

// Create an instance of TaskController, linking the service and view
const taskController = new TaskController(taskService, tasksView);

// Get references to the input field and the add task form
const itemInput = document.getElementById("item-input");
const todoAddForm = document.getElementById("todo-add");

// Get a live HTMLCollection of LI elements within the UL
// Note: 'lis' is a live collection. For dynamic lists,
// it's often safer to get elements at the time of use
// or convert to an array when iterating, as done in `clickedUl`.
const lis = ul.getElementsByTagName("li");

// --- Initial Data Load ---

// Request tasks from the controller to render them on page load
taskController.getTasks();

// --- Event Listeners ---

// Add a submit event listener to the form to add new tasks
todoAddForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission (page reload)
  taskController.add(itemInput.value); // Call controller method to add task
  itemInput.value = ""; // Clear the input field
  itemInput.focus(); // Set focus back to the input field
});

/**
 * Handles click events on the main <ul> element using event delegation.
 * Determines which button within a task item was clicked and performs the corresponding action.
 * @param {Event} e - The click event object.
 */
function clickedUl(e) {
  const dataAction = e.target.getAttribute("data-action");
  console.log(e.target); // Log the clicked element for debugging
  if (!dataAction) return; // If no 'data-action' attribute, ignore the click

  // Traverse up the DOM to find the parent <li> element of the clicked target
  let currentLi = e.target;
  while (currentLi.nodeName !== "LI") {
    currentLi = currentLi.parentElement;
  }

  // Get the index of the current <li> element within the 'lis' collection
  // This assumes 'lis' is kept up-to-date or the order doesn't change unexpectedly.
  const currentLiIndex = [...lis].indexOf(currentLi); // Convert to array for indexOf

  // Define actions based on the 'data-action' attribute
  const actions = {
    /**
     * Shows the edit input container for the specific task.
     */
    editButton: function () {
      const editContainer = currentLi.querySelector(".editContainer");

      // Hide all other edit containers to ensure only one is open at a time
      [...ul.querySelectorAll(".editContainer")].forEach(container => {
        container.removeAttribute("style"); // Removes 'display: flex' if previously set
      });

      editContainer.style.display = "flex"; // Show the current task's edit container
    },
    /**
     * Deletes the task associated with the clicked delete button.
     * Uses the 'data-id' attribute of the <li> element.
     */
    deleteButton: function () {
      taskController.remove(currentLi.getAttribute("data-id"));
    },
    /**
     * Saves the updated task title from the edit input field.
     * Uses the 'data-id' attribute of the <li> element.
     */
    containerEditButton: function () {
      const title = currentLi.querySelector(".editInput").value;
      const id = currentLi.getAttribute("data-id");
      taskController.update({ title, id }); // Pass object with title and ID for update
    },
    /**
     * Cancels the edit operation, hides the edit container, and reverts input value.
     */
    containerCancelButton: function () {
      currentLi.querySelector(".editContainer").removeAttribute("style"); // Hide the edit container
      // Revert the input value to the task's original title
      // Note: This relies on `arrInstancesTasks` being accessible and having a 'title' property.
      // If `arrInstancesTasks` is not globally available or managed by the controller,
      // you might need to fetch the original title from `taskController` or `currentLi.querySelector(".task-name").textContent`.
      currentLi.querySelector(".editInput").value = arrInstancesTasks[currentLiIndex].title;
    },
    /**
     * Toggles the completion status of the task.
     * Uses the 'data-id' attribute of the <li> element.
     */
    checkButton: function () {
      const id = currentLi.getAttribute("data-id");
      taskController.toggleDone(id);
    }
  };

  // Execute the appropriate action function if it exists
  if (actions[dataAction]) {
    actions[dataAction]();
  }
}

// Add a click event listener to the UL for event delegation
ul.addEventListener("click", clickedUl);

// --- Example API Calls (Demonstration / Testing) ---
// These blocks are separate examples and might not be directly integrated
// into the main application logic but serve as illustrations of `fetch`.

// Example using Promises (.then/.catch)
fetch("http://localhost:3000/users/")
  .then(response => response.json()) // Parse the JSON response
  .then(data => {
    console.log(data); // Log the parsed data
    console.log("Fetch using .then/.catch completed");
  })
  .catch(error => {
    console.error("Error during fetch using .then/.catch:", error); // Log any errors
    console.log("Fetch using .then/.catch finished with error");
  });
  // .finally(() => console.log("finally")) // Uncomment if you want to see 'finally' always run

// Example using Async/Await
; (async function () { // Immediately Invoked Async Function Expression (IIAFE)
    let users = [];

    try {
      // Await the fetch request and JSON parsing
      const response = await fetch("http://localhost:3002/users/"); // Note: This uses port 3002
      const _users = await response.json();
      console.log(_users);
      users = _users; // Assign fetched users to the 'users' variable
    } catch (e) {
      console.error("Error during async fetch:", e.message); // Log error message
    }
    console.log("Users fetched (async/await):", users); // Log users after fetch (even if empty due to error)
})();
