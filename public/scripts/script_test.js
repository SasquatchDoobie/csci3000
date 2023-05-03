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

//========================
// Clickable Albums
//========================
const albumListItems = document.querySelectorAll('.album_list_item');

albumListItems.forEach(albumListItem => {
    albumListItem.addEventListener('click', () => {
        // Removes the active class from all the album list items
        albumListItems.forEach(item => item.classList.remove('active-album'));

        // Adds the active class to the clicked album list item
        albumListItem.classList.add('active-album');

        // bodged it
        let activeAlbumElement = albumListItem.firstElementChild.innerHTML
        drawAlbum(activeAlbumElement)
    });
});

function drawAlbum(activeAlbumName) {

    if(gallery_data && gallery_data.length) {

        gallery_data.forEach( (album) => {

            if (album.albumname == activeAlbumName) {
                let counter = 1
                let photosHtml = ""
                album.albumcontent.images.forEach( (image) => {
                    photosHtml += `<img src='/images/${image}' alt='${counter}'> <br>`
                    counter += 1
                })
                document.getElementById('photos').innerHTML = photosHtml
            }
        })
    }


}

//=========================================================
// Sets the first album to be the default one on page load
//=========================================================

let aaaa = albumListItems[0]
aaaa.click()


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
