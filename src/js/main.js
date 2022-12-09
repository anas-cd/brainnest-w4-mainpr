import loadTheme from './theme.js';
import {inputValidator, activeNumKey} from './numpad.js';
import calcDisplay from './display.js';
import {showError,showPassMessage} from './showMessage.js';
// starter functions
loadTheme();

// DOM declerations
let decimalDot;
const padNumKeys = document.querySelectorAll('#key');
padNumKeys.forEach(el => {
    el.addEventListener('click', (e) => {
        calcRouter(inputValidator(e));
    });
    if (el.value == 'DOT') {
        decimalDot = el;
    }
});
document.body.addEventListener('keydown', (e) => {
    let input = inputValidator(e);
    if (input === false) {
        showError('Please use numbers and make sure NumLock is ON');
    } else {
        calcRouter(input);
        activeNumKey(padNumKeys, input);
    }
});

// variable declerations 
let buffer = ''; 
let memory = '';
let operation = '';

// functions
function calcRouter(input) {
    // checks for input in different senarios and make the prober opertaion depending on input
    switch (input) {
        case 'ADD':
            if (!buffer && !memory) {
                break;
            } else if (!buffer && memory) {
                operation = '+';
                calcDisplay(2, operation);
                break;
            } else if (buffer == '-') {
                break;
            }
            decimalDot.removeAttribute('disabled');
            memory = operate(operation, memory, buffer);
            buffer = '';
            operation = '+';
            calcDisplay(0, buffer);
            calcDisplay(1, memory);
            calcDisplay(2, operation);
            break;
        case 'SUB':
            if (!buffer && !memory) {
                break;
            } else if (!buffer && memory) {
                operation = '-';
                calcDisplay(2, operation);
                break;
            } else if (buffer == '-') {
                break;
            }
            decimalDot.removeAttribute('disabled');
            memory = operate(operation, memory, buffer);
            buffer = '';
            operation = '-';
            calcDisplay(0, buffer);
            calcDisplay(1, memory);
            calcDisplay(2, operation);
            break;
        case 'MUL':
            if (!buffer && !memory) {
                break;
            } else if (!buffer && memory) {
                operation = 'x';
                calcDisplay(2, operation);
                break;
            } else if (buffer == '-') {
                break;
            }
            decimalDot.removeAttribute('disabled');
            memory = operate(operation, memory, buffer);
            buffer = '';
            operation = 'x';
            calcDisplay(0, buffer);
            calcDisplay(1, memory);
            calcDisplay(2, operation);
            break;
        case 'DIV':
            if (!buffer && !memory) {
                break;
            }else if (!buffer && memory) {
                operation = '/';
                calcDisplay(2, operation);
                break;
            } else if (buffer == '-') {
                break;
            }
            decimalDot.removeAttribute('disabled');
            memory = operate(operation, memory, buffer);
            buffer = '';
            operation = '/';
            calcDisplay(0, buffer);
            calcDisplay(1, memory);
            calcDisplay(2, operation);
            break;
        case 'RST':
            decimalDot.removeAttribute('disabled');
            memory = '';
            buffer = '';
            operation = '';
            calcDisplay(0, buffer);
            calcDisplay(1, memory);
            calcDisplay(2, operation);
            break;
        case 'EQL':
            decimalDot.removeAttribute('disabled');
            if (!buffer && operation) {
                buffer = memory;
                operation = '';
                calcDisplay(0, buffer);
                calcDisplay(2, operation);
                break;
            }
            buffer = operate(operation, memory, buffer);
            memory = buffer;
            operation = '';
            calcDisplay(0, buffer);
            calcDisplay(1, memory);
            calcDisplay(2, operation);
            break;
        case 'DEL':
            let temp = buffer.slice(0, -1);
            let rem = buffer.slice(-1);
            buffer = temp;
            calcDisplay(0, buffer);
            if (rem == '.') {
                decimalDot.removeAttribute('disabled');
            }
            break;
        case 'DOT':
            if (decimalDot.hasAttribute('disabled') || buffer.includes('.')) {
                break;
            }
            decimalDot.setAttribute('disabled', 'true');
            if (buffer && !(buffer == '-')) {
                buffer = buffer + '.';
            } else if (buffer == '-') {
                buffer += '0.';
            } else buffer = '0' + '.';
            calcDisplay(0, buffer);
            break;
        case '-':
            if (!buffer) {
                buffer += input;
                calcDisplay(0, buffer);
            }
            break;
        case 'CPY':
            if (buffer) {
                navigator.clipboard.writeText(buffer);
                showPassMessage('copied to clipboard');
            }
            break;
        case 'PST':
            navigator.clipboard.readText().then((clipText => {
                if (!isNaN(clipText)) {
                    buffer = clipText;
                    if (buffer.includes('.')) {
                        decimalDot.setAttribute('disabled', 'true');
                    } else decimalDot.removeAttribute('disabled');
                    showPassMessage('pasted');
                    calcDisplay(0, buffer);   
                } else showError(`"${clipText}" is not a number`);
            }));
            break;
        case null:
            break;
        default:
            if (buffer == '0' && input == '0') {
                break;
            }
            buffer += input;
            calcDisplay(0, buffer);
            break;
    }
    
}

function operate(opr, memory, buffer) {
    // basic input filtering then calls the proper function depending on operation sign
    if (!buffer || buffer == '-') {
        return memory;
    } else {
        if (buffer[buffer.length - 1] == '.') {
            buffer = buffer.slice(0, -1);
        }
        switch (opr) {
            case '+':
                return addNums(memory, buffer);
            case '-':
                return subNums(memory, buffer);
            case 'x':
                return mulNums(memory, buffer);
            case '/':
                if (buffer == 0) {
                    showError('TO INFINITY AND BYOND ^_^ (you can\'t divide by 0). operation skipped!')
                    return memory;
                } else return divNums(memory, buffer);
            default:
                return buffer + '';
        }
    }
}

function addNums(num1, num2) {
    return (Math.round(((Number(num1) + Number(num2)) + Number.EPSILON) * 10000) / 10000) + '';
}
function subNums(num1, num2) {
    return (Math.round(((Number(num1) - Number(num2)) + Number.EPSILON) * 10000) / 10000) + '';
}
function mulNums(num1, num2) {
    return (Math.round(((Number(num1) * Number(num2)) + Number.EPSILON) * 10000) / 10000) + '';
}
function divNums(num1, num2) {
    return (Math.round(((Number(num1) / Number(num2)) + Number.EPSILON) * 10000) / 10000) + '';
}