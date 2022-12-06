const calculatorDsiplay = document.querySelector('#calcDisplay');
const memoryDisplay = document.querySelector('#MEM');
const currentOperationDisplay = document.querySelector('#OPR');

export default function display(location, content) {
    // location : 0 -> main display, 1 -> memory display, 2 -> operation display
    switch (location) {
        case 0:
            calculatorDsiplay.textContent = content.toLocaleString();
            break;
        case 1:
            memoryDisplay.textContent = content.toLocaleString();
            break;
        case 2:
            currentOperationDisplay.textContent = content;
            break;
        default:
            break;
    }
}