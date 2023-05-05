//========================
// Animation
//========================
const wrapper = document.querySelector('.wrapper-login');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

iconClose.addEventListener('click', ()=> {
    window.location.href = '/';
});

//========================
// Registration Validation
//========================
const form = document.getElementById('register-form');
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const username = document.getElementById('reg-username');
const password = document.getElementById('reg-password');
const confirmPassword = document.getElementById('confirm-password');

form.addEventListener('submit', (e) => {
    // getting values from the inputs
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    // check if any inputs are empty or invalid
    const formValid = checkInputs(firstNameValue, lastNameValue, usernameValue, passwordValue, confirmPasswordValue);

    // if form is invalid, prevent submission
    if (!formValid) {
        e.preventDefault();
    } else {
        console.log('Form is valid');
    }
});

// Validation Checks
function checkInputs(firstNameValue, lastNameValue, usernameValue, passwordValue, confirmPasswordValue) {
    let formValid = true;

    if(firstNameValue === '') {
        // show error
        setErrorFor(firstName, 'First name cannot be blank');
        formValid = false;
    } else {
        setSuccessFor(firstName);
    }

    if(lastNameValue === '') {
        // show error
        setErrorFor(lastName, 'Last name cannot be blank');
        formValid = false;
    } else {
        setSuccessFor(lastName);
    }

    if(usernameValue === '') {
        // show error
        setErrorFor(username, 'Username cannot be blank');
        formValid = false;
    } else {
        setSuccessFor(username);
    }

    if(passwordValue === '') {
        // show error
        setErrorFor(password, 'Password cannot be blank');
        formValid = false;
    } else if(passwordValue.length < 6) {
        setErrorFor(password, 'Password is too short (minimum 6 characters)');
        formValid = false;
    } else {
        setSuccessFor(password);
    }

    if(confirmPasswordValue !== passwordValue) {
         // show error
         setErrorFor(confirmPassword, 'Passwords do not match');
         formValid = false;
    } else if(confirmPasswordValue === '') {
        // show error
        setErrorFor(confirmPassword, 'Field cannot be blank');
        formValid = false;
    } else {
        setSuccessFor(confirmPassword);
    }

    return formValid;
}

// Sends error message
function setErrorFor(input, message) {
    const inputBox = input.parentElement;
    const small = inputBox.querySelector('small');

    small.innerText = message;

    inputBox.classList.add('error'); 
}

// Removes error message
function setSuccessFor(input) {
    const inputBox = input.parentElement;
    inputBox.classList.remove('error');
}