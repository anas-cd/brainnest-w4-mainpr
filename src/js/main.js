import loadTheme from './theme.js';
import {inputValidator, activeNumKey} from './numpad.js';
import display from './display.js';
import showError from './showError.js';
// starter functions
loadTheme();

// DOM declerations
let decimalDot;
const padNumKeys = document.querySelectorAll('#key');
padNumKeys.forEach(el => {
    el.addEventListener('click', (e) => {
        main(inputValidator(e));
    });
    if (el.value == 'DOT') {
        decimalDot = el;
    }
});
document.body.addEventListener('keydown', (e) => {
    main(inputValidator(e));
    activeNumKey(padNumKeys, e);
});

// variable declerations 
let buffer = ''; 
let memory = '';
let operation = '';


function main(input) {
    switch (input) {
        case 'ADD':
            if (!buffer && !memory) {
                break;
            }else if (!buffer && memory) {
                operation = '+';
                display(2, operation);
                break;
            }
            decimalDot.removeAttribute('disabled');
            memory = operate(operation, memory, buffer);
            buffer = '';
            operation = '+';
            display(0, buffer);
            display(1, memory);
            display(2, operation);
            break;
        case 'SUB':
            if (!buffer && !memory) {
                break;
            }else if (!buffer && memory) {
                operation = '-';
                display(2, operation);
                break;
            }
            decimalDot.removeAttribute('disabled');
            memory = operate(operation, memory, buffer);
            buffer = '';
            operation = '-';
            display(0, buffer);
            display(1, memory);
            display(2, operation);
            break;
        case 'MUL':
            if (!buffer && !memory) {
                break;
            }else if (!buffer && memory) {
                operation = 'x';
                display(2, operation);
                break;
            }
            decimalDot.removeAttribute('disabled');
            memory = operate(operation, memory, buffer);
            buffer = '';
            operation = 'x';
            display(0, buffer);
            display(1, memory);
            display(2, operation);
            break;
        case 'DIV':
            if (!buffer && !memory) {
                break;
            }else if (!buffer && memory) {
                operation = '/';
                display(2, operation);
                break;
            }
            decimalDot.removeAttribute('disabled');
            memory = operate(operation, memory, buffer);
            buffer = '';
            operation = '/';
            display(0, buffer);
            display(1, memory);
            display(2, operation);
            break;
        case 'RST':
            decimalDot.removeAttribute('disabled');
            memory = '';
            buffer = '';
            operation = '';
            display(0, buffer);
            display(1, memory);
            display(2, operation);
            break;
        case 'EQL':
            decimalDot.removeAttribute('disabled');
            buffer = operate(operation, memory, buffer);
            memory = buffer;
            operation = '';
            display(0, buffer);
            display(1, memory);
            display(2, operation);
            break;
        case 'DEL':
            let temp = buffer.slice(0, -1);
            let rem = buffer.slice(-1);
            buffer = temp;
            display(0, buffer);
            if (rem == '.') {
                decimalDot.removeAttribute('disabled');
            }
            break;
        case 'DOT':
            decimalDot.setAttribute('disabled', 'true');
            if (buffer) {
                buffer = buffer + '.';
            } else buffer = '0' + '.';
            display(0, buffer);
            break;
        case null:
            break;
        default:
            buffer = buffer + input;
            display(0, buffer);
            break;
    }
    
}

function operate(opr, memory, buffer) {
    if (!buffer) {
        return '';
    }else {
        switch (opr) {
            case '+':
                return (Math.round(((Number(memory) + Number(buffer)) + Number.EPSILON) * 10000) / 10000) + '';
            case '-':
                return (Math.round(((Number(memory) - Number(buffer)) + Number.EPSILON) * 10000) / 10000) + '';
            case 'x':
                return (Math.round(((Number(memory) * Number(buffer)) + Number.EPSILON) * 10000) / 10000) + '';
            case '/':
                if (buffer == 0) {
                    showError('TO INFINITY AND BYOND (you can\'t divide by 0 ^_^\'). operation skipped!')
                    return memory;
                } else return (Math.round(((Number(memory) / Number(buffer)) + Number.EPSILON) * 10000) / 10000) + '';
            default:
                return buffer + '';
        }
    }
}



