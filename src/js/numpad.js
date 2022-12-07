import showError from './showError.js';

export default function numpadValidate(e) {
    switch (e.key) {
        case '0':
            return '0';
        case '1':
            return '1';
        case '2':
            return '2';
        case '3':
            return '3';
        case '4':
            return '4';
        case '5':
            return '5';
        case '6':
            return '6';
        case '7':
            return '7';
        case '8':
            return '8';
        case '9':
            return '9';
        case '+':
            return 'ADD';
        case '-':
            return 'SUB';
        case '*':
            return 'MUL';
        case '/':
            return 'DIV';
        case '.':
            return 'DOT';
        case 'Enter':
            return 'EQL';
        case 'NumLock':
            return null;
        case 'Backspace':
            return 'DEL';
        case 'Delete':
            return 'RST';
        default:
            showError('Please use numbers and make sure NumLock is ON');
            return null;
    }
}

export function inputValidator(input) {
    if (input.type === 'keydown') {
        return numpadValidate(input);
    } else if (input.type === 'click') {
        return input.target.value;
    }
}

export function activeNumKey(numpadKeys, e) {
    numpadKeys.forEach(element => {
        if (element.value == numpadValidate(e)) {
            element.classList.toggle('keyActive');
            setTimeout(() => {
                element.classList.toggle('keyActive');
            }, 50);
        }
    });
}