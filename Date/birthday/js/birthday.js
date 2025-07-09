function daysUntil(month, day) {
  // Get the current date and time.
  const currentDate = new Date();
  // Set the time to midnight (start of the day) to ensure accurate day calculation.
  currentDate.setHours(0);
  currentDate.setMinutes(0);
  currentDate.setSeconds(0);
  currentDate.setMilliseconds(0);

  // Get the current year.
  let currentYear = currentDate.getFullYear();

  // Create a Date object for the birthday in the current year.
  // Note: Month is 0-indexed in JavaScript Date objects (e.g., January is 0, December is 11),
  // so we subtract 1 from the provided 'month'.
  const birthdayThisYear = new Date(currentYear, month - 1, day);

  // Get the timestamp (milliseconds since epoch) for both dates.
  const currentDateTS = +currentDate; // Shorthand for currentDate.getTime()
  let birthdayThisYearTS = +birthdayThisYear; // Shorthand for birthdayThisYear.getTime()

  // If the birthday this year has already passed, set the birthday to next year.
  if (birthdayThisYearTS < currentDateTS) {
      currentYear++; // Increment the current year to target the next year.
      birthdayThisYear.setFullYear(currentYear); // Update the birthday date object to next year.
      birthdayThisYearTS = +birthdayThisYear; // Update its timestamp.
  }

  // Define the value of one day in milliseconds.
  const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
  // Calculate the difference between the upcoming birthday and the current date in milliseconds.
  const differenceInMS = birthdayThisYearTS - currentDateTS;

  // Convert the difference from milliseconds to days and return as an integer.
  // parseInt() truncates any partial days, giving you the number of full days remaining.
  return parseInt(differenceInMS / ONE_DAY_IN_MS);
}
