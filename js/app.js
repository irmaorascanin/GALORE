const API_URL = "https://galore.onrender.com";

function loadPage(page) {
    console.log(`Loading page: ${page}`);

    fetch(`views/${page}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById("content").innerHTML = html;
        })
        .catch(error => {
            console.error("Error loading page:", error);
            document.getElementById("content").innerHTML = "<h1>Error loading page</h1>";
        });
}

document.addEventListener("DOMContentLoaded", () => {
    loadPage("home");
});

function togglePassword(id) {
    let input = document.getElementById(id);

    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}