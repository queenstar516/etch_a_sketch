const gridContainer = document.getElementById("grid-container");
const grid = document.querySelectorAll(".grid");
const numSquares = document.getElementById("num-squares");
const gridBtn = document.getElementById("grid-btn");
const monoBtn = document.getElementById("mono-btn");
const rainbowBtn = document.getElementById("rainbow-btn");
const eraserBtn = document.getElementById("eraser-btn");
const clearBtn = document.getElementById("clear-btn");
const colorPicker = document.getElementById("color-picker");
let selectedColor = colorPicker.value;

//function to create grids
function createGrids(numGrids) {
    gridContainer.innerHTML ="";
    
    const gridSize = 400;
    const squareSize = Math.floor(gridSize / numGrids);

    for (let i = 0; i < numGrids * numGrids ; i++) {
        const grid = document.createElement("div");
        grid.className = "grid";
        grid.style.width = `${squareSize}px`;
        grid.style.height = `${squareSize}px`;
        gridContainer.appendChild(grid);
    }
    gridContainer.style.gridTemplateColumns = `repeat(${numGrids}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${numGrids}, 1fr)`;

}

window.addEventListener("load", function () {
    createGrids(16);
    gridContainer.addEventListener("mouseover", (event) => {
        if (event.target.classList.contains("grid")) {
            event.target.style.backgroundColor = "black";
            }
        }); 
});



//buttons selection
gridBtn.addEventListener("click", function () {
    createGrids(numSquares.value);
});
rainbowBtn.addEventListener("click", activateRainbowMode);
eraserBtn.addEventListener("click", eraseGrid);
clearBtn.addEventListener("click", clearGrid);


// function to generate a random color
function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];   
    }
    return color;
}

//rainbow function
function activateRainbowMode() {
    // event delegation
    gridContainer.addEventListener("mouseover", (event) => {
    if (event.target.classList.contains("grid")) {
        const randomColor = generateRandomColor();
        event.target.style.backgroundColor = randomColor;
        }
    });
}

colorPicker.addEventListener("input", function () {
    selectedColor = colorPicker.value;
    gridContainer.addEventListener("mouseover", (event) => {
        if (event.target.classList.contains("grid")) {
            event.target.style.backgroundColor = selectedColor;
            }
        }); 
});

//eraser function
function eraseGrid() {
    gridContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("grid")) {
                event.target.style.backgroundColor = "#f5f5f5";
            }
    });
}

const originalBackgroundColor = "#f5f5f5";

function clearGridCell(cell) {    
    cell.style.backgroundColor = originalBackgroundColor;
}

function clearGrid() {
    gridContainer.querySelectorAll(".grid").forEach(cell => {
        clearGridCell(cell);
    });
}