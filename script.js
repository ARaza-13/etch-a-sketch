// Store every div square in array for easy access in changing each div color
let gridSquares = [];

// Create a variable that stores a boolean to track whether or not the mouse clicked //
// if mouse is clicked, then we can color thr grid //
let mouseClicked = false;

const grid = document.querySelector('.grid');
const resetBtn = document.querySelector('.reset-btn');
const blackBtn = document.querySelector('.black-btn');
const randomBtn = document.querySelector('.random-btn');
const eraserBtn = document.querySelector('.eraser');
const colorBtn = document.querySelector('.color-btn');
const gridLines = document.querySelector('.grid-lines');
const paintBrush = document.querySelector('.paintbrush');
const slider = document.getElementById('slider');
const sliderLabel = document.querySelector('.slider-label');

// Add functionality to buttons and slider //
grid.onclick = () => activatePencil();
resetBtn.onclick = () => removeColor();
blackBtn.onclick = () => addBlackColor();
randomBtn.onclick = () => addRandomColor();
eraserBtn.onclick = () => eraseColor();
colorBtn.oninput = () => pickColor();
gridLines.onclick = () => toggleGridLines();
slider.onmousemove = (e) => updateSliderValue(e.target.value);
slider.onchange = (e) => replaceGrid(e.target.value);

// if we click the mouse when hovering over the grid, the boolean variable will be "true"
// thus allowing us to apply color, and clicking again will stop applying color
function activatePencil() {
    if (!mouseClicked) {
        mouseClicked = true;
        paintBrush.textContent = "Paint Brush: On";
    } else {
        mouseClicked = false;
        paintBrush.textContent = "Paint Brush: Off";
    }
}

function updateSliderValue(value) {
    sliderLabel.textContent = `Grid Size: ${value} x ${value}`;
}

// Replace Current Grid with New Grid //
function replaceGrid(rows) {
    removeGrid();
    createGrid(rows);
}

// Remove the Current Grid by Looping Through and Removing Each Row //
function removeGrid() {
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }
}

// Function to Create Each Grid Square // 
// Sets Grid Square Height and Width Based off Grid Dimensions //
function createGrid(rows) {
    gridSquares.length = 0;  // resets div squares array to 0 for whenever we want to change grid layout
    const cellDims = 650 / rows;  // 650 is the width and height of the grid container

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
        grid.appendChild(row);
    }
}

// Adds EventListener to each Grid Square that applies a random color when Hovering with the Mouse //
function addRandomColor() {
    gridSquares.forEach((square) => {
        square.addEventListener("mousemove", () => {
            if (mouseClicked) {
                let randomColors = getRandomColor();
                square.style.backgroundColor = `rgb(${randomColors[0]}, ${randomColors[1]}, ${randomColors[2]})`;
            }
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
        square.addEventListener("mousemove", () => {
            if (mouseClicked) square.style.backgroundColor = 'black'; 
    });
});
}

// Function for the Eraser button //
function eraseColor() {
    gridSquares.forEach((square) => {
        square.addEventListener("mousemove", () => {
            if (mouseClicked) square.style.backgroundColor = 'inherit'; 
        });
    });
}

// Function to pick color from color wheel //
function pickColor() {
    const colorValue = document.getElementById("colorpicker").value;
    
    gridSquares.forEach((square) => {
        square.addEventListener("mousemove", () => {
            if (mouseClicked) square.style.backgroundColor = `${colorValue}`;
        });
    });
}

// Reset Button to Remove all color from the Grid //
function removeColor() {
    gridSquares.forEach((square) => {
        square.style.backgroundColor = 'inherit'; 
    });
}

// Function to toggle the grid lines on/off //
function toggleGridLines() {
    gridSquares.forEach((square) => {
        square.classList.toggle('remove-grid-lines'); 
    });
}

createGrid(16);