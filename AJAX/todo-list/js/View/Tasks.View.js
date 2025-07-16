/**
 * Generates an <li> element representing a single task.
 * @param {object} obj - The task object with properties like id, title, and completed.
 * @returns {HTMLElement} The created <li> element with all its child elements.
 */
function generateLiTask(obj) {
  // Create the main list item element
  const li = document.createElement("li");
  li.className = "todo-item";
  // Store the task's ID directly on the <li> element for easy retrieval
  li.setAttribute("data-id", obj.id);

  // Create and configure the check button
  const checkButton = document.createElement("button");
  checkButton.className = "button-check";
  // Dynamically set the 'displayNone' class for the check icon based on task completion status
  checkButton.innerHTML = `
      <i class="fas fa-check ${obj.completed ? "" : "displayNone"}" data-action="checkButton"></i>`;
  checkButton.setAttribute("data-action", "checkButton"); // Redundant but harmless, as already in innerHTML
  li.appendChild(checkButton);

  // Create and configure the task name paragraph
  const p = document.createElement("p");
  p.className = "task-name";
  p.textContent = obj.title; // Set the task title
  li.appendChild(p);

  // Create and configure the edit icon
  const editButton = document.createElement("i");
  editButton.className = "fas fa-edit";
  editButton.setAttribute("data-action", "editButton");
  li.appendChild(editButton);

  // Create the edit container (for input and edit/cancel buttons)
  const containerEdit = document.createElement("div");
  containerEdit.className = "editContainer";

  // Create and configure the edit input field
  const inputEdit = document.createElement("input");
  inputEdit.setAttribute("type", "text");
  inputEdit.className = "editInput";
  inputEdit.value = obj.title; // Pre-fill with the current task title
  containerEdit.appendChild(inputEdit);

  // Create and configure the 'Edit' button within the edit container
  const containerEditButton = document.createElement("button");
  containerEditButton.className = "editButton";
  containerEditButton.textContent = "Edit";
  containerEditButton.setAttribute("data-action", "containerEditButton");
  containerEdit.appendChild(containerEditButton);

  // Create and configure the 'Cancel' button within the edit container
  const containerCancelButton = document.createElement("button");
  containerCancelButton.className = "cancelButton";
  containerCancelButton.textContent = "Cancel";
  containerCancelButton.setAttribute("data-action", "containerCancelButton");
  containerEdit.appendChild(containerCancelButton);

  // Append the entire edit container to the list item
  li.appendChild(containerEdit);

  // Create and configure the delete icon
  const deleteButton = document.createElement("i");
  deleteButton.className = "fas fa-trash-alt";
  deleteButton.setAttribute("data-action", "deleteButton");
  li.appendChild(deleteButton);

  return li;
}

// export default is used when a module exports a single primary entity.
export default class TasksView {
  /**
   * Constructor for TasksView.
   * @param {HTMLElement} container - The DOM element (e.g., <ul>) where tasks will be rendered.
   */
  constructor(container) {
      this.container = container; // Store the container element
  }

  /**
   * Renders a list of tasks into the view's container.
   * It first clears the current content of the container and then appends new task elements.
   * @param {Array<object>} tasks - An array of task objects to be rendered.
   */
  render(tasks) {
    this.container.innerHTML = ""; // Clear existing content to prevent duplicates
    tasks.forEach(taskObj => {
      // For each task object, generate its corresponding <li> element
      // and append it to the container.
      this.container.appendChild(generateLiTask(taskObj));
    });
  }
}
