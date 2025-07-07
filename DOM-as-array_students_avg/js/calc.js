function sum() {
    // The 'arguments' object is an array-like object corresponding to the arguments passed to a function.
    // It's not a true array, so we need to convert it to use array methods like .reduce().

    // Option 1: Convert 'arguments' to a real array using Array.from().
    // const numbers = Array.from(arguments);

    // Option 2 (Modern & Concise): Convert 'arguments' to a real array using the spread syntax (...).
    // This unpacks the elements from 'arguments' into a new array.
    const numbers = [...arguments];

    // Use .reduce() to calculate the sum of all numbers in the 'numbers' array.
    // 'sum' is the accumulator, 'atual' (current) is the current number being processed.
    // The initial value of the accumulator is 0.
    return numbers.reduce(function (sum, atual) {
        return sum + atual; // Add the current number to the running sum.
    }, 0);
}

function average() {
    // To calculate the average, we sum all the arguments and divide by the number of arguments.
    // sum(...arguments) calls the 'sum' function, passing all arguments received by 'average' to 'sum'.
    // 'arguments.length' gives us the total count of arguments passed to 'average'.
    return sum(...arguments) / arguments.length;
}

// Get all table rows within the tbody.
const tableRows = document.querySelectorAll('tbody tr');

// Loop through each student row to process its data.
tableRows.forEach(row => {
    // Get all table data cells (td) within the current row.
    const cells = row.querySelectorAll('td');

    const grades = []; // An array to store the grades for the current student.

    // Iterate through cells starting from the second one (index 1) to skip the 'Name' cell.
    // Stop before the last cell (cells.length - 1) to skip the 'Average' cell.
    for (let i = 1; i < cells.length - 1; i++) {
        // Get the text content of the cell and convert it to a floating-point number.
        const grade = parseFloat(cells[i].textContent);

        // Check if the parsed grade is a valid number before adding it to the grades array.
        if (!isNaN(grade)) {
            grades.push(grade);
        }
    }

    let studentAverage = 0;
    // Ensure there are grades before attempting to calculate the average.
    if (grades.length > 0) {
        // Use the 'avarege' function provided by your instructor.
        // The spread syntax (...) here unpacks the 'grades' array elements as separate arguments.
        studentAverage = average(...grades);
    }

    // Select the last cell in the current row, which is designated for the 'Average'.
    const averageCell = cells[cells.length - 1];

    // Update the text content of the 'Average' cell.
    // toFixed(2) formats the number to two decimal places for better readability.
    averageCell.textContent = studentAverage.toFixed(2);
});
