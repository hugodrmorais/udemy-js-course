function showFeedback(message: string, type: string): void {
  alert(type.toUpperCase() + ": " + message);
}

const feedback = showFeedback("hello", "info");

function showError(message: string): never {
  throw new Error("Function marked with 'never' never returns anything.");
}

const error = showError("error message");
