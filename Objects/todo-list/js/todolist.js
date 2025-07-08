; (function () {
    "use strict";

    // Task Constructor Function:
    // This function creates task objects with a name, completion status, and timestamps.
    // It also provides methods to manage the task's state.
    function Task(name, completed, createdAt, updatedAt) {
        // Enforce calling with 'new' keyword. Prevents errors if 'Task()' is called directly.
        if (this === undefined) return;

        // Private variable for the task name, accessible only via methods (closure).
        let _name = name;

        // Public properties with default values if not provided.
        this.completed = typeof completed === 'boolean' ? completed : false; // Defaults to false
        this.createdAt = createdAt || Date.now();                          // Defaults to current timestamp
        this.updatedAt = updatedAt || null;                                // Defaults to null

        // Public method to change the task's name.
        // It updates the private name and sets the 'updatedAt' timestamp.
        this.changeName = function (newName) {
            if (newName) { // Only update if a new name (non-empty/null/undefined) is provided.
                _name = newName;
                this.updatedAt = Date.now(); // Record when the name was updated.
            }
        };

        // Public method to retrieve the task's name.
        this.getName = function () {
            return _name;
        };

        // Public method to toggle the completion status of the task.
        // It inverts the 'completed' boolean and updates 'updatedAt'.
        this.toggleDone = function() {
            this.completed = !this.completed;
            this.updatedAt = Date.now(); // Record when the status changed.
        };
    }

    // Initial array of task data (literal objects).
    let arrTasks = [
        {
            name: "task 1",
            completed: true,
            createdAt: 1592667375012,
            updatedAt: null
        },
        {
            name: "task 2",
            createdAt: 1581667345723,
            updatedAt: 1592667325018
        },
        {
            name: "task 3",
            completed: true,
            createdAt: 1592667355018,
            updatedAt: 1593677457010
        }
    ];

    // SOLUTION: Convert the array of literal objects into an array of Task instances.
    // This is crucial for using the methods defined in the Task constructor.
    const arrInstancesTasks = arrTasks.map(taskData =>
        new Task(taskData.name, taskData.completed, taskData.createdAt, taskData.updatedAt)
    );

    // STORE DOM ELEMENTS IN VARIABLES for easier access.
    const itemInput = document.getElementById("item-input");
    const todoAddForm = document.getElementById("todo-add");
    const ul = document.getElementById("todo-list");
    // Get a live HTMLCollection of all <li> elements inside the <ul>.
    // This needs to be converted to an array when its index is used, as seen in clickedUl.
    const lis = ul.getElementsByTagName("li");

    // Function to generate an <li> HTML element for a given Task object.
    function generateLiTask(obj) {
        const li = document.createElement("li");
        const p = document.createElement("p");
        const checkButton = document.createElement("button");
        const editButton = document.createElement("i");
        const deleteButton = document.createElement("i");

        li.className = "todo-item";

        // Create the check button with the correct class for the checkmark icon.
        checkButton.className = "button-check";
        checkButton.innerHTML = `
            <i class="fas fa-check ${obj.completed ? "" : "displayNone"}" data-action="checkButton"></i>`;
        checkButton.setAttribute("data-action", "checkButton"); // Set data-action for event delegation.

        li.appendChild(checkButton);

        p.className = "task-name";
        // SOLUTION: Use the getName() method of the Task instance to get the task's name.
        p.textContent = obj.getName();
        li.appendChild(p);

        editButton.className = "fas fa-edit";
        editButton.setAttribute("data-action", "editButton"); // Set data-action for editing.
        li.appendChild(editButton);

        // Create the edit container with input field and buttons.
        const containerEdit = document.createElement("div");
        containerEdit.className = "editContainer";
        const inputEdit = document.createElement("input");
        inputEdit.setAttribute("type", "text");
        inputEdit.className = "editInput";
        // SOLUTION: Populate the edit input with the current task name using getName().
        inputEdit.value = obj.getName();

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
        deleteButton.setAttribute("data-action", "deleteButton"); // Set data-action for deletion.
        li.appendChild(deleteButton);

        return li; // Return the fully constructed list item.
    }

    // Function to render all tasks from the arrInstancesTasks array to the DOM.
    function renderTasks() {
        ul.innerHTML = ""; // Clear existing list items to avoid duplicates.
        arrInstancesTasks.forEach(taskInstance => { // Iterate over each Task instance.
            ul.appendChild(generateLiTask(taskInstance)); // Append the generated <li> to the <ul>.
        });
    }

    // Function to add a new task.
    function addTask(taskName) {
        // SOLUTION: Add a new Task instance to the array.
        // A new task starts with default 'completed', 'createdAt', and 'updatedAt'.
        arrInstancesTasks.push(new Task(taskName));
    }

    // Event handler for clicks on the <ul> element.
    // Uses event delegation to handle clicks on dynamically created buttons within list items.
    function clickedUl(e) {
        const dataAction = e.target.getAttribute("data-action"); // Get the action requested by the clicked element.
        console.log(e.target);
        if (!dataAction) return; // If no data-action, it's not a relevant button, so do nothing.

        let currentLi = e.target;
        // Traverse up the DOM tree from the clicked element until the parent <li> is found.
        while (currentLi.nodeName !== "LI") {
            currentLi = currentLi.parentElement;
        }
        // Find the index of the relevant Task instance in arrInstancesTasks
        // by finding the index of its corresponding <li> in the DOM list.
        const currentLiIndex = [...lis].indexOf(currentLi);

        // Define actions to perform based on the 'data-action' attribute.
        const actions = {
            editButton: function () {
                const editContainer = currentLi.querySelector(".editContainer");

                // Hide all other open edit containers before showing the current one.
                [...ul.querySelectorAll(".editContainer")].forEach(container => {
                    container.removeAttribute("style");
                });

                editContainer.style.display = "flex"; // Make the current edit container visible.
            },
            deleteButton: function () {
                arrInstancesTasks.splice(currentLiIndex, 1); // Remove the task instance from the array.
                renderTasks(); // Re-render the UI to reflect the deletion.
            },
            containerEditButton: function () {
                const val = currentLi.querySelector(".editInput").value; // Get the new name from the input.
                // SOLUTION: Use the changeName() method of the Task instance to update its name.
                arrInstancesTasks[currentLiIndex].changeName(val);
                renderTasks(); // Re-render to show the updated name.
            },
            containerCancelButton: function () {
                currentLi.querySelector(".editContainer").removeAttribute("style"); // Hide the edit container.
                // SOLUTION: Reset the input value to the task's original name using getName().
                currentLi.querySelector(".editInput").value = arrInstancesTasks[currentLiIndex].getName();
            },
            checkButton: function () {
                // SOLUTION: Use the toggleDone() method of the Task instance to flip its completion status.
                arrInstancesTasks[currentLiIndex].toggleDone();
                renderTasks(); // Re-render to update the checkmark icon.
            }
        };

        // Execute the appropriate action if a matching data-action is found.
        if (actions[dataAction]) {
            actions[dataAction]();
        }
    }

    // Event listener for the form submission (when a new task is added).
    todoAddForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission (page refresh).
        console.log(itemInput.value); // Log the input value for debugging.
        addTask(itemInput.value);     // Call addTask to create a new Task instance.
        renderTasks();                // Re-render the list to show the new task.

        itemInput.value = ""; // Clear the input field after adding.
        itemInput.focus();    // Set focus back to the input for quick entry of next task.
    });

    // Event listener on the <ul> for click events (event delegation).
    // This allows handling clicks on future dynamically added <li> elements and their buttons.
    ul.addEventListener("click", clickedUl);

    // Initial rendering of tasks when the script first loads.
    renderTasks();

})();
