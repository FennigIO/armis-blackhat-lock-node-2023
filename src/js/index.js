(() => {
    const socket = io();

    const modal = document.getElementById('modal');
    const errorField = document.getElementById('error-field');
    const form = document.getElementById('form');
    const input = document.getElementById('input');
    const arrow = document.getElementById('arrow');
    const unlockBtn = document.getElementById('unlock');
    const lockBtn = document.getElementById('lock');
    const codeText = document.getElementById('code-text');

    
    const modalHeader = document.getElementById('modal-header');
    const modalBody = document.getElementById('modal-body');

    let isSubmitted = false;

    const successArrow = () => {
        arrow.classList.value = 'success';
        errorField.innerHTML = '';
    }

    const errorArrow = (message) => {
        isSubmitted = false;
        arrow.classList.value = 'error';
        errorField.innerHTML = message ?? 'ERROR.<br/>The code must be 5 digits long.';
    }

    const clearInput = () => {
        arrow.classList.value = '';
        errorField.innerHTML = '';
    }

    const displayModal = () => {
        modal.classList.value = 'show';
    }

    const hideModal = () => {
        modal.classList.value = '';
        input.value = '';
        isSubmitted = false;
        clearInput();
    }

    const changeModal = (header, body) => {
        modalHeader.innerHTML = header;
        modalBody.innerHTML = body;
    }

    const submitForm = (e) => {
        e.preventDefault();
        if (!isSubmitted){
            isSubmitted = true;

            if (input.value.length === 5) {
                socket.emit('validate-code', input.value);
            } else {
                errorArrow();
            }
        }
    }

    const validateRespone = (msg) => {
        if (msg === 'error') {
            changeModal('Oh No!', `Unfortunately, your code didn't open the vault.<br/><br/>
            This doesn't have to be your only attempt.<br/><br/>
            Continue engaging on the app to earn more points to unlock another key.<br/><br/>
            Don't forget, your connection with us has contributed to our donation to St. Jude's Children's Research Hospital`);
        } else {
            changeModal('CONGRATULATIONS, you won!!!', 'Choose a prize from the vault and enjoy!')
            successArrow();
        }
        displayModal();
    }

    const lockSafe = (e) => {
        e.preventDefault();
        socket.emit('trigger-lock');
    }

    const unlockSafe = (e) => {
        e.preventDefault();
        socket.emit('trigger-unlock');
    }

    const displayCodeSent = (code) => {
        if (codeText) {
            codeText.innerHTML = code;
        }
    }

    if (lockBtn) {
        lockBtn.addEventListener('click', lockSafe);
    }
    
    if (unlockBtn) {
        unlockBtn.addEventListener('click', unlockSafe);
    }
    
    if (modal) {
        modal.addEventListener('click', hideModal);
    }

    if (form) {
        form.addEventListener('submit', submitForm);
    }

    if (input) {
        input.addEventListener('input', (e) => {
            e.preventDefault();
            clearInput();
        });
    }

    socket.on('validate-response', validateRespone);
    
    socket.on('code-entered', displayCodeSent);
})()