export function Task(title, completed, createdAt, updatedAt, id) {
  // Ensure the 'title' parameter is provided, as it's required.
  if (!title) {
    throw new Error("Task requires a 'title' parameter.");
  }

  // Assign properties from parameters, with default values for optional ones.
  this.title = title;
  this.completed = completed || false; // Defaults to false if not provided
  this.createdAt = createdAt || Date.now(); // Defaults to current timestamp if not provided
  this.updatedAt = updatedAt || null; // Defaults to null if not provided
  this.id = id || null; // Defaults to null if not provided

  /**
   * Toggles the 'completed' status of the task.
   */
  this.toggleDone = function () {
    this.completed = !this.completed;
  };
}
