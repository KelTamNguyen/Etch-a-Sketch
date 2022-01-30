console.log('The script is running');

const DEFAULT_SIZE = 16;
var grid = document.querySelector('#grid');

function setUpGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`; // why does this not work?

    for (let i = size; i < size * size; i++) {
        const square = document.createElement('div');
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        square.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
        square.addEventListener('mouseover', (event) => {
            event.target.style.backgroundColor = '#333333';
        })
        grid.appendChild(square);
    }
}

window.onload = () => {
    setUpGrid(DEFAULT_SIZE);
}