let body = document.querySelector('body');
let container = document.getElementById('container');

function defaultGrid() {
    for (let i = 1; i <= 256; i++) {
        let div = document.createElement('div');
        container.classList.add('container');
        div.className = 'square-div';
        div.id = i;
        container.appendChild(div);
    }
}
defaultGrid();

function setNewGrid(size) {
    for (let i = 1; i <= (size * size); i++) {
        let div = document.createElement('div');
        container.classList.remove('container');
        container.style.cssText =  `width: 560px; height: 560px; display: grid; grid-template: repeat(${size}, 1fr) / repeat(${size}, 1fr); row-gap: 1px; column-gap: 1px;`;
        div.className = 'square-div';
        div.id = i;
        container.appendChild(div);
        makeDivsResponsive('white');
    }
}

function eliminateGrid() {
    let elementsToDelete = Array.from(container.childNodes);
    elementsToDelete.forEach(element => {
        container.removeChild(element);
    })
}

function newColorForSquares(e) {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);  
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function makeDivsResponsive() {
    let divs = document.querySelectorAll('.square-div');
    for (let i = 0; i < divs.length; i++) {    
        divs[i].addEventListener('mouseover', newColorForSquares);
    }  
}

makeDivsResponsive();

let clearGridButton = document.getElementById('button');
clearGridButton.addEventListener('click', () => {
    let query = document.getElementById('query');
    if(query) {
        body.removeChild(query);
    }
    return clearGrid();
})

function clearGrid() {
    eliminateGrid();
    defaultGrid();
    container.style.cssText =  `width: 560px; height: 560px; display: grid; grid-template: repeat(16, 1fr) / repeat(16, 1fr); row-gap: 1px; column-gap: 1px;`;
    makeDivsResponsive();
}

let changeSizeButton = document.getElementById('size');
changeSizeButton.addEventListener('click', changeGridSize);



function changeGridSize() {
   eliminateGrid();
   let size = prompt("Insert the new size for the grid (1-64)");
   let searchForNonDigit = /(?:^[1-6][0-4]$)|(?:^[1-5][1-9]$)|(?:^[1-9]$)/g;
   let query = document.getElementById('query');

   if(query) {
            body.removeChild(query);
        } else if(size == '') { 
       return clearGrid();
   } else if(searchForNonDigit.test(size) === false) {
       
        clearGrid();
        return askForNumber();
   } else {
        container.classList.remove('container');
        setNewGrid(size);
   }
   
}


function askForNumber() {
    let query = document.createElement('div');
    query.id = 'query';
    query.innerHTML = "Enter a number between 1 and 64 please!";
    query.className = 'query-for-number';
    body.insertBefore(query, clearGridButton);
}