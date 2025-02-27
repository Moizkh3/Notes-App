const noteContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function showNotes() {
    noteContainer.innerHTML = localStorage.getItem("notes") || ""; 
    ensureDeleteButtons();  // Ensure each note has a delete button
    attachDeleteListeners();  // Attach click listeners to delete buttons
}
showNotes();

function updateStorage() {
    localStorage.setItem("notes", noteContainer.innerHTML);
}

// Ensure each note has a delete button
function ensureDeleteButtons() {
    document.querySelectorAll(".input-box").forEach(p => {
        if (!p.querySelector("img")) { // If img doesn't exist, add it
            let img = document.createElement("img");
            img.src = "images/delete.png";
            p.appendChild(img);
        }
    });
}

// Function to attach event listeners to delete buttons
function attachDeleteListeners() {
    document.querySelectorAll(".notes-container img").forEach(img => {
        img.addEventListener("click", function () {
            this.parentElement.remove();
            updateStorage();
        });
    });
}

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";

    noteContainer.appendChild(inputBox).appendChild(img);
    updateStorage();  // Save new notes to localStorage
    attachDeleteListeners(); // Attach event listeners after adding a new note
});

noteContainer.addEventListener("input", function () {
    updateStorage();
});
