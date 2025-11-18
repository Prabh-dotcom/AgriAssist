// header.js

// Function to load the header
function loadHeader() {
  fetch("header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;
    })
    .catch(error => console.error("Error loading header:", error));
}

// Load header after DOM is ready
document.addEventListener("DOMContentLoaded", loadHeader);
