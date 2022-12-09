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
            if (e.shiftKey == true) {
                return '-'
            }
            return 'SUB';
        case '*':
            return 'MUL';
        case '/':
            return 'DIV';
        case '.':
            return 'DOT';
        case 'Enter':
            return 'EQL';
        case 'Backspace':
            return 'DEL';
        case 'Delete':
            return 'RST';
        case '_':
            return '-';
        case 'c' || 'C':
            if (e.ctrlKey == true) {
                return 'CPY';
            }
            return null;
        case 'v' || 'V':
            if (e.ctrlKey == true) {
                return 'PST';
            }
            return null;
        case 'NumLock':
            return null;
        case 'Shift':
            return null;
        case 'Tab':
            return null;
        case 'Control':
            return null;
        default:
            return false;
    }
}

export function inputValidator(input) {
    if (input.type === 'keydown') {
        return numpadValidate(input);
    } else if (input.type === 'click') {
        return input.target.value;
    }
}

export function activeNumKey(numpadKeys, input) {
    // adding 'keyActive' class on the selected button corresponding to the users input
    numpadKeys.forEach(element => {
        if (element.value == input) {
            element.classList.toggle('keyActive');
            setTimeout(() => {
                element.classList.toggle('keyActive');
            }, 50);
        }
    });
}