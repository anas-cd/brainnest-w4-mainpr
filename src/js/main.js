import loadTheme from './theme.js';
import numpadValidate from './numpad.js';
import display from './display.js';
loadTheme();

const keypadInput = document.body.addEventListener('keydown', main);
const mouseInput = document.querySelectorAll('#key').forEach(el => {
    el.addEventListener('click', main);
});

function inputValidator(input) {
    if (input.type === 'keydown') {
        return numpadValidate(input);
    } else if (input.type === 'click') {
        return input.target.value;
    }
}

function main(input) {
    display(0 ,inputValidator(input));
}



