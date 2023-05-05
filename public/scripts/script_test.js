//========================
// Album Form Validation
//========================
const form = document.getElementById('album-form');
const albumName = document.getElementById('albumname');
let selectedImages = [];
let removeAlbum = "";

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
// Selectable Albums
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
        removeAlbum = activeAlbumElement
    });
});

function drawAlbum(activeAlbumName) {

    if(gallery_data && gallery_data.length) {

        gallery_data.forEach( (album) => {

            if (album.albumname == activeAlbumName) {
                let counter = 1
                let photosHtml = ""
                let album_content = album.albumcontent
                album_content.images.forEach( (image) => {
                    photosHtml += `<img class='gallery-image' id='gallery-image-${counter}' src='/images/${image}' alt='${counter}'> <br>`
                    counter += 1
                })
                document.getElementById('photos').innerHTML = photosHtml
                selectImages()
                selectedImages = []
            }
        })
    }


}

//=========================================================
// Sets the first album to be the default one on page load
//=========================================================

let aaaa = albumListItems[0]
aaaa.click()

//==========================================
// Allows the user to select gallery images 
//==========================================

const imgreg = new RegExp("(?<=images\/).*$")

function selectImages() {

    const galleryListItems = document.querySelectorAll('.gallery-image');

    galleryListItems.forEach(galleryListItem => {
        galleryListItem.addEventListener('click', () => {
            if(galleryListItem.classList.contains('selected-image')) {
                galleryListItem.classList.remove('selected-image')
                
                let index = selectedImages.indexOf(imgreg.exec(galleryListItem.src)[0])
                if (index > -1) {
                    selectedImages.splice(index, 1)
                }
                console.log(selectedImages)

            } else { 
                galleryListItem.classList.add('selected-image') 
                selectedImages.push(imgreg.exec(galleryListItem.src)[0])
                console.log(selectedImages)
            }

        });
    });

}

//============================================
// Function to send delete request for images
//============================================


async function submitForDeletion() {

    const response = await fetch("deleteimages", {
        method : "PUT",
        headers : {
            "Accept" : "application/json, text/plain, */*",
            "Content-type" : "application/json"
        },
        body : JSON.stringify({album:removeAlbum, images:selectedImages})
    })

    window.location.replace(`${response.url}`) 

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
