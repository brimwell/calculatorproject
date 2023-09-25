function doTheMath() {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    switch(functionToUse) {
        case '+':
            firstNumber = Math.round(((firstNumber + secondNumber) + Number.EPSILON) * 1000000) / 1000000;
            break;
        case '-':
            firstNumber = Math.round(((firstNumber - secondNumber) + Number.EPSILON) * 1000000) / 1000000;
            break;
        case '*':
            firstNumber = Math.round(((firstNumber * secondNumber) + Number.EPSILON) * 1000000) / 1000000;
            break;
        case '/':
            firstNumber = Math.round(((firstNumber / secondNumber) + Number.EPSILON) * 1000000) / 1000000;
            break;
        default:
    };
    secondNumber = undefined;
    if (isFinite(firstNumber)) {
        displayNumber.textContent = firstNumber;
    } else {
        displayNumber.textContent = 'Error. Press Clear and try again';
    }
}

const display = document.querySelector('#display');
const displayNumber = document.querySelector('#displayNumber');
const numberButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.op');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('#equals');
const decimalButton = document.querySelector('.decimal');
const backSpace = document.querySelector('.backSpace');

let firstNumber;
let secondNumber;
let numberToggle;
let functionToUse;


document.addEventListener('keydown', (e) => {
    if (e.key === '.' || 
        (e.key >= 0 && e.key <= 9) || 
        e.key === '+' || 
        e.key === '-' || 
        e.key === '/' || 
        e.key === '*' || 
        e.key === 'Escape' || 
        e.key === 'Backspace') {
        document.getElementById(e.key + "btn").click();
    };
    if (e.key === 'Enter') {
        document.getElementById('equals').click();
    };
});

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (!numberToggle) {
            if (firstNumber === undefined || displayNumber.textContent === '0') {
                displayNumber.textContent = button.textContent;
                firstNumber = displayNumber.textContent;
            } else if (displayNumber.textContent.length < 10) {
                displayNumber.textContent += button.textContent;
                firstNumber = displayNumber.textContent;
            };
        } else {
            if (functionToUse === undefined) {
                
            } else if (secondNumber === undefined || displayNumber.textContent === '0') {
                displayNumber.textContent = button.textContent;
                secondNumber = displayNumber.textContent;
            } else if (displayNumber.textContent.length < 10) {
                displayNumber.textContent += button.textContent;
                secondNumber = displayNumber.textContent;
            };
        }
    });
});

backSpace.addEventListener('click', () => {
    if (!numberToggle) {
        if (firstNumber !== undefined) {
            displayNumber.textContent = displayNumber.textContent.slice(0, -1);
            firstNumber = displayNumber.textContent;
        };
    } else {
        if (secondNumber !== undefined) {
            displayNumber.textContent = displayNumber.textContent.slice(0, -1);
            secondNumber = displayNumber.textContent;
        };
    }
});


decimalButton.addEventListener('click', () => {
    if (!numberToggle) {
        if (displayNumber.textContent === '0') {
            displayNumber.textContent += decimalButton.textContent;
            firstNumber = displayNumber.textContent;
        } else if ((displayNumber.textContent.length < 10) && (firstNumber % 1 === 0)) {
            displayNumber.textContent += decimalButton.textContent;
            firstNumber = displayNumber.textContent;
        };
    } else {
        if (functionToUse === undefined) {
                
        } else if (secondNumber === undefined) {
            displayNumber.textContent = '0' + decimalButton.textContent;
            secondNumber = displayNumber.textContent;
        } else if ((displayNumber.textContent.length < 10) && (secondNumber % 1 === 0)) {
            displayNumber.textContent += decimalButton.textContent;
            secondNumber = displayNumber.textContent;
        };
    }
});

clearButton.addEventListener('click', () => {
    displayNumber.textContent = 0;
    firstNumber = undefined;
    secondNumber = undefined;
    numberToggle = undefined;
    functionToUse = undefined;
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (firstNumber !== undefined && secondNumber !== undefined) {
            doTheMath();
            functionToUse = button.textContent;
        } else if (firstNumber !== undefined) {
            numberToggle = true;
            functionToUse = button.textContent;
        } 
    });
});

equalButton.addEventListener('click', () => {
    doTheMath();
    functionToUse = undefined;
});


