export function Task(title, completed, createdAt, updatedAt) {
  if (!title) {
    throw new Error("Task requires a 'title' parameter.");
  }

  let _title = title; // Private variable for title to control setting
  this.completed = completed || false;
  this.createdAt = createdAt || Date.now();
  this.updatedAt = updatedAt || null;

  /**
   * Toggles the completion status of the task.
   */
  this.toggleDone = function () {
    this.completed = !this.completed;
  };

  /**
   * Returns the title of the task.
   * @returns {string} The task's title.
   */
  this.getTitle = () => _title;

  /**
   * Sets a new title for the task and updates the `updatedAt` timestamp.
   * @param {string} newTitle - The new title for the task.
   */
  this.setTitle = function (newTitle) {
    _title = newTitle;
    this.updatedAt = Date.now();
    console.log("------");
    console.log(this);
  };
}
