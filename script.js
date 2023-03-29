const container = document.querySelector('.container');
const rows = container.children;
const resetBtn = document.querySelector('.reset-btn');
const blackBtn = document.querySelector('.black-btn');
const colorBtn = document.querySelector('.color-btn');


// Allow User Input to Generate New Grid Size //
function changeGrid() {
    let input = prompt("Enter the New Grid Layout (1-100)");

    while (Number.isNaN(Number(input)) || input < 1 || input > 100) {
        input = prompt("Please Enter a Valid Input (1-100)");
    }
    return Number(input);
    
}

// Replace Current Grid with New Grid //
function replaceGrid() {
    removeGrid();
    const newRows = changeGrid();
    createGrid(newRows);
}

// Remove the Current Grid by Looping Through Each Row//
function removeGrid() {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}

// Function to Create Each Grid Square // 
// Sets Grid Square Height and Width Based off Grid Dimensions //
function createGrid(rows) {
    const cellDims = 650 / rows;

    for (let i = 1; i <= rows; i++) {
        const row = document.createElement('div')
        row.classList.add('row');
        row.setAttribute('id', `row-${i}`);

        for (let j = 1; j <= rows; j++) {
            const div = document.createElement('div');
            div.classList.add('square');
            div.style.cssText = `width: ${cellDims}px; height: ${cellDims}px;`;
            row.appendChild(div);
        }
        container.appendChild(row);
    }
}

// Adds EventListener to each Grid Square that applies a random color when Hovering with the Mouse //
function addRandomColor() {
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let gridSquares = row.children;
        for (let j = 0; j < gridSquares.length; j++) {
            let gridSquare = gridSquares[j];
            gridSquare.addEventListener("mouseover", () => {
                let randomColors = changeColor();
                gridSquare.style.backgroundColor = `rgb(${randomColors[0]}, ${randomColors[1]}, ${randomColors[2]})`;
            });
        }
    }
}

// Adds EventListener to each Grid Square that applies a black color when Hovering with the Mouse //
function addBlackColor() {
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let gridSquares = row.children;
        for (let j = 0; j < gridSquares.length; j++) {
            let gridSquare = gridSquares[j];
            gridSquare.addEventListener("mouseover", () => {
               gridSquare.style.backgroundColor = 'black'; 
            });
        }
    }
}

// Selects 3 random values to be used for RGB color //
function changeColor() {
    const randomColors = [];

    for (let i = 1; i <= 3; i++) {
        let randomNum = Math.floor(Math.random() * 256);
        randomColors.push(randomNum);
    }
    return randomColors;
}

// Add Event Listener to Reset Button to Remove all color from the Grid //
// Loops through the child of each row to access each individual grid square //
function removeColor() {
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let gridSquares = row.children;
        for (let j = 0; j < gridSquares.length; j++) {
            let gridSquare = gridSquares[j];
            gridSquare.style.backgroundColor = 'inherit';
        }
    }
}

createGrid(16);