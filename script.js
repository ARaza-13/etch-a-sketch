const container = document.querySelector('.container');
const resetBtn = document.querySelector('.reset-btn');
const blackBtn = document.querySelector('.black-btn');
const randomBtn = document.querySelector('.random-btn');
const colorBtn = document.querySelector('.color-btn');

// Store every div square in array for easy access in changing each div color
let gridSquares = [];


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
    gridSquares.length = 0;  // resets div squares array to 0 for whenever we want to change grid layout
    const cellDims = 650 / rows;  // 650 is the width and height of the container

    for (let i = 1; i <= rows; i++) {
        const row = document.createElement('div')
        row.classList.add('row');
        row.setAttribute('id', `row-${i}`);

        for (let j = 1; j <= rows; j++) {
            const div = document.createElement('div');
            div.classList.add('square');
            div.style.cssText = `width: ${cellDims}px; height: ${cellDims}px;`;
            gridSquares.push(div);
            row.appendChild(div);
        }
        container.appendChild(row);
    }
}

// Adds EventListener to each Grid Square that applies a random color when Hovering with the Mouse //
function addRandomColor() {
    gridSquares.forEach((square) => {
        square.addEventListener("mouseover", () => {
            let randomColors = getRandomColor();
            square.style.backgroundColor = `rgb(${randomColors[0]}, ${randomColors[1]}, ${randomColors[2]})`;
    });
});
}

// Selects 3 random values to be used for RGB color //
function getRandomColor() {
    const randomColors = [];

    for (let i = 1; i <= 3; i++) {
        let randomNum = Math.floor(Math.random() * 256);
        randomColors.push(randomNum);
    }
    return randomColors;
}
    

// Adds EventListener to each Grid Square that applies a black color when Hovering with the Mouse //
function addBlackColor() {
    gridSquares.forEach((square) => {
        square.addEventListener("mouseover", () => {
            square.style.backgroundColor = 'black'; 
    });
});
}

// Function to pick color from color wheel //
function pickColor() {
    const colorValue = document.getElementById("colorpicker").value;
    
    gridSquares.forEach((square) => {
        square.addEventListener("mouseover", () => {
            square.style.backgroundColor = `${colorValue}`;
    });
});
}

// Reset Button to Remove all color from the Grid //
function removeColor() {
    gridSquares.forEach((square) => {
        square.style.backgroundColor = 'inherit'; 
    });
}

createGrid(16);