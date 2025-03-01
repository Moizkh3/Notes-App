const noteContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Load notes from localStorage
function showNotes() {
    noteContainer.innerHTML = localStorage.getItem("notes") || ""; 
    attachDeleteListeners(); 
}
showNotes();

// Update localStorage
function updateStorage() {
    localStorage.setItem("notes", noteContainer.innerHTML);
}

// Attach event listeners to delete buttons
function attachDeleteListeners() {
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            this.parentElement.remove();
            updateStorage();
        });
    });
}

// Create a new note
createBtn.addEventListener("click", () => {
    let noteDiv = document.createElement("div");
    noteDiv.className = "note";
    noteDiv.innerHTML = `
        <p contenteditable="true"></p>  
        <button class="delete-btn">
            <svg viewBox="0 0 24 24">
                <path d="M3 6H5H21M19 6L18.346 19.107C18.2623 20.6888 16.9525 22 15.3684 22H8.63158C7.04749 22 5.73774 20.6888 5.65399 19.107L5 6M10 11V17M14 11V17" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    `;

    noteContainer.appendChild(noteDiv);
    updateStorage();
    attachDeleteListeners();
});

// Auto-save when typing
noteContainer.addEventListener("input", updateStorage);
