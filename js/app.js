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

function loadPage(page) {
    console.log("Redirecting to " + page);
}

function loadPage(page) {
    const content = document.getElementById("content");
    content.style.opacity = 0; 
    setTimeout(() => {
        content.style.opacity = 1; 
    }, 300); 
}
