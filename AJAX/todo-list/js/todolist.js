
import { Task } from './Model/Task.model.js'
import { createXMLHttpRequest } from './createXMLHttpRequest.js'

const url = "http://localhost:3000/users/1/tasks"
createXMLHttpRequest("GET", url, init)

function init(arrTasks) {
  // Create an array containing instances of the Task constructor from the literal objects.
  // This array should be named arrInstancesTasks.
  if(arrTasks.error) return

  const arrInstancesTasks = arrTasks.map(task => {
    const { title, completed, createdAt, updatedAt } = task;
    return new Task(title, completed, createdAt, updatedAt);
  });


  // --- DOM ELEMENT REFERENCES ---
  const itemInput = document.getElementById("item-input");
  const todoAddForm = document.getElementById("todo-add");
  const ul = document.getElementById("todo-list");
  // Note: 'lis' is a live HTMLCollection, but using spread operator on ul.children
  // or direct querySelectorAll within functions is often safer for dynamic lists.
  // For now, let's keep it as is, but be mindful of its live nature.
  const lis = ul.getElementsByTagName("li");

  /**
   * Generates an <li> element for a given Task object.
   * @param {Task} obj - The Task instance to render.
   * @returns {HTMLElement} The generated <li> element.
   */
  function generateLiTask(obj) {
    const li = document.createElement("li");
    const p = document.createElement("p");
    const checkButton = document.createElement("button");
    const editButton = document.createElement("i");
    const deleteButton = document.createElement("i");

    li.className = "todo-item";

    checkButton.className = "button-check";
    // Conditionally add 'displayNone' class based on task completion status
    checkButton.innerHTML = `
        <i class="fas fa-check ${obj.completed ? "" : "displayNone"}" data-action="checkButton"></i>`;
    checkButton.setAttribute("data-action", "checkButton"); // Redundant as already in innerHTML, but harmless
    li.appendChild(checkButton);

    p.className = "task-name";
    p.textContent = obj.getTitle(); // Use getName() to access the task name
    li.appendChild(p);

    editButton.className = "fas fa-edit";
    editButton.setAttribute("data-action", "editButton");
    li.appendChild(editButton);

    const containerEdit = document.createElement("div");
    containerEdit.className = "editContainer";
    const inputEdit = document.createElement("input");
    inputEdit.setAttribute("type", "text");
    inputEdit.className = "editInput";
    inputEdit.value = obj.getTitle(); // Pre-fill with current task name

    containerEdit.appendChild(inputEdit);
    const containerEditButton = document.createElement("button");
    containerEditButton.className = "editButton";
    containerEditButton.textContent = "Edit";
    containerEditButton.setAttribute("data-action", "containerEditButton");
    containerEdit.appendChild(containerEditButton);
    const containerCancelButton = document.createElement("button");
    containerCancelButton.className = "cancelButton";
    containerCancelButton.textContent = "Cancel";
    containerCancelButton.setAttribute("data-action", "containerCancelButton");
    containerEdit.appendChild(containerCancelButton);

    li.appendChild(containerEdit);

    deleteButton.className = "fas fa-trash-alt";
    deleteButton.setAttribute("data-action", "deleteButton");
    li.appendChild(deleteButton);

    return li;
  }

  /**
   * Renders all tasks from `arrInstancesTasks` into the DOM.
   * Clears existing tasks and re-appends them.
   */
  function renderTasks() {
    ul.innerHTML = ""; // Clear current list to avoid duplicates
    arrInstancesTasks.forEach(taskObj => {
      ul.appendChild(generateLiTask(taskObj));
    });
  }

  /**
   * Adds a new task instance to the `arrInstancesTasks` array and re-renders the list.
   * @param {string} taskName - The name for the new task.
   */
  function addTask(taskName) {
    arrInstancesTasks.push(new Task(taskName));
    renderTasks(); // Re-render the list to show the new task
  }

  /**
   * Handles click events on the main <ul> element (event delegation).
   * Determines which button was clicked and performs the corresponding action.
   * @param {Event} e - The click event object.
   */
  function clickedUl(e) {
    const dataAction = e.target.getAttribute("data-action");
    console.log(e.target); // Log the clicked element
    if (!dataAction) return; // If no data-action, exit

    let currentLi = e.target;
    // Traverse up the DOM tree until an <li> element is found
    while (currentLi.nodeName !== "LI") {
        currentLi = currentLi.parentElement;
    }
    // Get the index of the clicked <li> element within the 'lis' HTMLCollection
    // Note: Using 'lis' directly here can be tricky if the list changes after initial load.
    // It's safer to use Array.from(ul.children).indexOf(currentLi) if 'lis' is not guaranteed to be up-to-date.
    const currentLiIndex = [...lis].indexOf(currentLi);

    const actions = {
      /**
       * Shows the edit container for the clicked task.
       */
      editButton: function () {
        const editContainer = currentLi.querySelector(".editContainer");

        // Hide all other edit containers
        [...ul.querySelectorAll(".editContainer")].forEach(container => {
          container.removeAttribute("style"); // Or set display: none directly
        });

        editContainer.style.display = "flex"; // Show the current task's edit container
      },
      /**
       * Deletes the clicked task from the array and re-renders.
       */
      deleteButton: function () {
        arrInstancesTasks.splice(currentLiIndex, 1); // Remove task from array
        renderTasks(); // Re-render the list
      },
      /**
       * Saves the edited task name.
       */
      containerEditButton: function () {
        const val = currentLi.querySelector(".editInput").value; // Get new name from input
        arrInstancesTasks[currentLiIndex].setName(val); // Update task name using setName method
        renderTasks(); // Re-render to reflect changes
      },
      /**
       * Cancels the edit and hides the edit container.
       */
      containerCancelButton: function () {
        currentLi.querySelector(".editContainer").removeAttribute("style"); // Hide edit container
        // Reset the input value to the original task name
        currentLi.querySelector(".editInput").value = arrInstancesTasks[currentLiIndex].getName();
      },
      /**
       * Toggles the completion status of the task.
       * It uses the `toggleDone` method of the correct Task object.
       */
      checkButton: function () {
        arrInstancesTasks[currentLiIndex].toggleDone(); // Use the Task object's method
        renderTasks(); // Re-render to show updated status (e.g., checkmark visibility)
      }
    };

    // Execute the appropriate action if it exists
    if (actions[dataAction]) {
      actions[dataAction]();
    }
  }

  // --- EVENT LISTENERS ---

  // Handle form submission to add new tasks
  todoAddForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission (page reload)
    console.log(itemInput.value); // Log the input value
    addTask(itemInput.value); // Add the new task

    itemInput.value = ""; // Clear the input field
    itemInput.focus(); // Set focus back to the input field
  });

  // Use event delegation on the <ul> to handle clicks on dynamically created buttons
  ul.addEventListener("click", clickedUl);

  // Initial render of tasks when the script loads
  renderTasks();
}

