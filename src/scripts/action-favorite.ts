// Add a click event listener to the button
document.getElementById("back-button").addEventListener("click", function () {
  // Go back to the previous page
  window.history.back();
});

// Trigger the click event on the button when the page loads
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("back-button").click();
});
