console.log('The script is running');

const DEFAULT_COLOR = '#333333';
const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'color';
const DEFAULT_BG_MODE = 'light';
var currentColor = DEFAULT_COLOR;
var currentSize = DEFAULT_SIZE;
var currentColoringMode = DEFAULT_MODE;
var currentBackgroundMode = DEFAULT_BG_MODE;

var grid = document.querySelector('#grid');
var colorInput = document.querySelector('#color-input');
var resetButton = document.getElementById('reset');
var darkModeButton = document.getElementById('dark-mode');
var rainbowButton = document.getElementById('rainbow')
var modalBg = document.querySelector('.modal-bg');
var modalClose = document.querySelector('.modal-close');
var sizeInput = document.querySelector('#size');
var applyBtn = document.querySelector('#apply');

colorInput.addEventListener('input', (e) => {
    currentColor = e.target.value;
});
applyBtn.addEventListener('click', () => {
    if (sizeInput.value !== null) {
        setNewSize(sizeInput.value);
        setUpGrid(sizeInput.value);
        closeModal();
    }
});
modalClose.addEventListener('click', closeModal);
resetButton.addEventListener('click', clearGrid);
darkModeButton.addEventListener('click', () => {
    console.log('Background: Dark mode');
});
rainbowButton.addEventListener('click', () => setColoringMode('rainbow'));

function setNewSize(size) {
    currentSize = size;
}

function setColoringMode(coloringMode) {
    currentColoringMode = coloringMode;
    console.log(currentColoringMode);
}

function toggleBackground() {
    
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
        if (currentBackgroundMode === 'light') {
            square.style.backgroundColor = 'white';
        } else if (currentBackgroundMode === 'dark') {
            square.style.backgroundColor = 'white';
        }
        // square.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
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