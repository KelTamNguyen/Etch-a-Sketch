console.log('The script is running');

// Variables
const DEFAULT_COLOR = 'rgb(51,51,51)';
const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'color';
const DEFAULT_CANVAS_MODE = 'light';
let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;
let currentColoringMode = DEFAULT_MODE;

// DOM References
const grid = document.querySelector('#grid');
const colorInput = document.querySelector('#color-input');
const resetButton = document.getElementById('reset');
const rainbowButton = document.getElementById('rainbow');
const colorButton = document.getElementById('color');
const modalBg = document.querySelector('.modal-bg');
const modalClose = document.querySelector('.modal-close');
const sizeInput = document.querySelector('#size');
const applyBtn = document.querySelector('#apply');

function setNewSize(size) {
    currentSize = size;
}

function setColoringMode(coloringMode) {
    currentColoringMode = coloringMode;
    if (coloringMode === 'rainbow') {
        rainbowButton.classList.add('active-button');
        if (colorButton.classList.contains('active-button')) {
            colorButton.classList.remove('active-button');
        }
    }
    else if (coloringMode === 'color') {
        colorButton.classList.add('active-button');
        if (rainbowButton.classList.contains('active-button')) {
            rainbowButton.classList.remove('active-button');
        }
    }
}

function clearGrid() {
    grid.innerHTML = '';
    initializeGrid(currentSize);
    console.log(currentSize);
    openModal();
}

function openModal() {
    modalBg.classList.add('bg-active');
}

function closeModal() {
    modalBg.classList.remove('bg-active');
    sizeInput.value= "";
}

function initializeGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.style.backgroundColor = 'rgb(216, 216, 216)';
        square.style.opacity = "0";
        square.dataset.isColored = false;
        square.dataset.color = 'rgb(216, 216, 216)';
        square.addEventListener('mouseover', colorSquare);
        grid.appendChild(square);
    }
}

function colorSquare(event) {
    if (currentColoringMode === 'color') {
        event.target.style.backgroundColor = currentColor;
        event.target.setAttribute('data-color', 'rgb(51, 51, 51)');
    }
    else if (currentColoringMode === 'rainbow') {
        let randomR = Math.floor(Math.random() * 256);
        let randomG = Math.floor(Math.random() * 256);
        let randomB = Math.floor(Math.random() * 256);
        event.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
        event.target.setAttribute('data-color',  `rgb(${randomR}, ${randomG}, ${randomB})`);
    }

    if (event.target.dataset.isColored === 'true') {
        let currentOpacity = Number(getComputedStyle(event.target).getPropertyValue('opacity'));
        event.target.style.opacity = (currentOpacity + 0.1).toString();
    }
    
    event.target.setAttribute('data-is-colored', 'true');
}

function setCurrentColor(color) {
    currentColor = color;
}

colorInput.addEventListener('input', (e) => {
    setCurrentColor(e.target.value);
});
applyBtn.addEventListener('click', () => {
    if (sizeInput.value !== null) {
        if (sizeInput.value <= 100) {
            setNewSize(sizeInput.value);
        } 
        else if (sizeInput.value > 100) {
            setNewSize(100);
        }
        initializeGrid(sizeInput.value);
        closeModal();
    }
});
modalClose.addEventListener('click', closeModal);
resetButton.addEventListener('click', clearGrid);
rainbowButton.addEventListener('click', () => setColoringMode('rainbow'));
colorButton.addEventListener('click', () => setColoringMode('color'));

window.onload = () => {
    initializeGrid(DEFAULT_SIZE);
    colorButton.classList.add('active-button');
}