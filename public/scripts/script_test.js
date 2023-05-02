//========================
// Album Form Validation
//========================
const form = document.getElementById('album-form');
const albumName = document.getElementById('albumname');

form.addEventListener('submit', (e) => {
    const albumNameValue = albumName.value.trim();

    const formValid = validateForm(albumNameValue);

    if (!formValid) {
        e.preventDefault();
    } else {
        console.log('Form is Valid');
    }
});

function validateForm(albumNameValue) {
    let formValid = true;
    var alphaNumeric = /^[0-9a-zA-Z\s]+$/;

    if (albumNameValue === '') {
        // show error
        setErrorFor(albumName, 'Album name cannot be empty');
        formValid = false;
    } else if (!albumNameValue.match(alphaNumeric)) {
        setErrorFor(albumName, 'Album name can only contain alphanumeric characters');
        formValid = false;
    } else {
        setSuccessFor(albumName);
    }

    return formValid;
}

// Sends error message
function setErrorFor(input, message) {
    const albumInput = input.parentElement;
    const p = albumInput.querySelector('p');

    p.innerText = message;

    albumInput.classList.add('error');
}

// Removes error message
function setSuccessFor(input) {
    const albumInput = input.parentElement;
    albumInput.classList.remove('error');
}

//==========================================================
// Form validation needs to be above for this for it to work
//==========================================================
let queuedcontent = []


let queue = document.getElementById("#queue")
let input = document.getElementById("input")

input.addEventListener("change", () => {

    const files = input.files
    console.log(files)

})