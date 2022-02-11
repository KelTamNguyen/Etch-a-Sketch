console.log('The script is running');

const DEFAULT_COLOR = '#333333';
const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'color';
const DEFAULT_CANVAS_MODE = 'light';
var currentColor = DEFAULT_COLOR;
var currentSize = DEFAULT_SIZE;
var currentColoringMode = DEFAULT_MODE;

var grid = document.querySelector('#grid');
var colorInput = document.querySelector('#color-input');
var resetButton = document.getElementById('reset');
var rainbowButton = document.getElementById('rainbow');
var colorButton = document.getElementById('color');
var modalBg = document.querySelector('.modal-bg');
var modalClose = document.querySelector('.modal-close');
var sizeInput = document.querySelector('#size');
var applyBtn = document.querySelector('#apply');

colorInput.addEventListener('input', (e) => {
    currentColor = e.target.value;
});
applyBtn.addEventListener('click', () => {
    if (sizeInput.value !== null) {
        if (sizeInput.value <= 100) {
            setNewSize(sizeInput.value);
        } 
        else if (sizeInput.value > 100) {
            setNewSize(100);
        }
        setUpGrid(sizeInput.value);
        closeModal();
    }
});
modalClose.addEventListener('click', closeModal);
resetButton.addEventListener('click', clearGrid);
rainbowButton.addEventListener('click', () => setColoringMode('rainbow'));
colorButton.addEventListener('click', () => setColoringMode('color'))

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
    setUpGrid(currentSize);
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

function setUpGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.style.backgroundColor = 'rgb(216, 216, 216)';
        square.addEventListener('mouseover', colorSquare)
        grid.appendChild(square);
    }
}

function colorSquare(event) {
    if (currentColoringMode === 'color') {
        event.target.style.backgroundColor = currentColor;
    }
    else if (currentColoringMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        event.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    }
}

window.onload = () => {
    setUpGrid(DEFAULT_SIZE);
}