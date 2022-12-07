const errDisplay = document.querySelector('#errMsg');

export default function showError(errMsg) {
    errDisplay.textContent = errMsg;
    errDisplay.classList.toggle('errActive');

    setTimeout(() => {
        errDisplay.classList.toggle('errActive');
    }, 4000);
}