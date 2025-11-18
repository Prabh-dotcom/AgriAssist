// footer.js

// Function to load the footer
function loadFooter() {
  fetch("footer.html")
    .then(response => {
      if (!response.ok) throw new Error("Footer file not found");
      return response.text();
    })
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    })
    .catch(error => console.error("Error loading footer:", error));
}

// Load footer after DOM is ready
document.addEventListener("DOMContentLoaded", loadFooter);
