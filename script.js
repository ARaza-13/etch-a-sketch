const container = document.querySelector('.container');

// Function to Create Each Grid Square // 
// Added Event Listener to each grid square to change color when hovering over with the mouse //
function createGrid() {
    for (let i = 1; i <= 256; i++) {
        const div = document.createElement('div');
        div.classList.add('square');
        div.addEventListener("mouseover", () => {
            div.classList.add('color');
        });
        container.appendChild(div);
    }
}

createGrid();