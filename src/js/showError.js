const errDisplay = document.querySelector('#errContainer');
const p = document.createElement('p');
export default function showError(errMsg) {
    let currentErrorNode = p.cloneNode(false);
    currentErrorNode.textContent = errMsg;
    errDisplay.prepend(currentErrorNode);
    currentErrorNode.classList.toggle('errActive');
    setTimeout(() => {
       currentErrorNode.remove();
    }, 4000 );

}


