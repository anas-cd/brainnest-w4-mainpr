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
            return 'Enter';
        case 'NumLock':
            return 'please make sure NumLock is on';
        default:
            // alert('ERR: please make sure NumLock is on');
            return 'please make sure NumLock is on';
    }
}