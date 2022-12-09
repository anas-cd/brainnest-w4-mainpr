const calculatorDsiplay = document.querySelector('#calcDisplay');
const memoryDisplay = document.querySelector('#MEM');
const currentOperationDisplay = document.querySelector('#OPR');
const AVG_CHAR_WIDTH = 28;

export default function calcDisplay(location, content) {
    // location : 0 -> main display, 1 -> memory display, 2 -> operation display
    switch (location) {
        case 0:
            checkDisplaySize(content);
            calculatorDsiplay.textContent = rectifyNumber(content);
            break;
        case 1:
            memoryDisplay.textContent = content;
            break;
        case 2:
            currentOperationDisplay.textContent = content;
            break;
        default:
            break;
    }
}

function checkDisplaySize(number) {
    // dynamically change 'font-size' property when the length of displayed number is larger than current screen width
    if (number.length*AVG_CHAR_WIDTH >= calculatorDsiplay.getBoundingClientRect().width) {
        calculatorDsiplay.setAttribute('style', 'font-size: 2rem;');
    } else calculatorDsiplay.removeAttribute('style');
}

function rectifyNumber(number) {
    // 3 modes for viewing numbers : three digit numbers separated by commas, plain number, scientific notation (exponential)
    if (number) {
        if (isNaN(number)) {
            return number;
        } else if (number.length >= 16) {
            return number;
        } else {
            if (number.includes('.') && number.length > 2) {
                let num = number.split('.');
                return Number(num[0]).toLocaleString() + '.' + num[1];
            } else if (number.includes('.') && number.length <= 2) {
                return number;   
            } else return (Number(number)).toLocaleString();
        }
    }
}