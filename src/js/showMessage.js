const errDisplay = document.querySelector('#msgContainer');
const p = document.createElement('p');

export function showError(errMsg) {
    // makes a clone of the error showing element then populates it with the error message and display if for 4 seconds 
    let currentErrorNode = p.cloneNode(false);
    currentErrorNode.textContent = errMsg;
    errDisplay.prepend(currentErrorNode);
    currentErrorNode.classList.toggle('errActive');
    setTimeout(() => {
       currentErrorNode.remove();
    }, 4000 );
}

export function showPassMessage(msg) {
    let currentMessageNode = p.cloneNode(false);
    currentMessageNode.textContent = msg;
    errDisplay.prepend(currentMessageNode);
    currentMessageNode.classList.toggle('passMsgActive');
    setTimeout(() => {
       currentMessageNode.remove();
    }, 4000 );
}


