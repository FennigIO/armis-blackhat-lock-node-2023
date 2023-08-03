(() => {
    const socket = io();

    const modal = document.getElementById('modal');
    const errorField = document.getElementById('error-field');
    const form = document.getElementById('form');
    const input = document.getElementById('input');
    const arrow = document.getElementById('arrow');

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
            errorArrow('ERROR.<br/>The code you entered is invalid.');
        } else {
            successArrow();
            displayModal();
        }
    }

    
    modal.addEventListener('click', hideModal);

    form.addEventListener('submit', submitForm);

    input.addEventListener('input', (e) => {
        e.preventDefault();
        clearInput();
    });

    socket.on('validate-response', validateRespone);
})()