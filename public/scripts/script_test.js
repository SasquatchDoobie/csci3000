let queuedcontent = []


let queue = document.getElementById("#queue")
let input = document.getElementById("input")


input.addEventListener("change", () => {

    const files = input.files
    console.log(files)

})

//========================
// Album Form Validation
//========================
function validateForm() {
    var albumname = document.getElementById("albumname").value;
    var alphaNumeric = /^[0-9a-zA-Z\s]+$/;

    // Checks for empty input, then checks for alpha numeric (allows spaces)
    if (albumname.trim() === "") {
      alert("Album name cannot be empty");
      return false;
    } else if (!albumname.match(alphaNumeric)) {
      alert("Album name can only contain alphanumeric characters");
      return false;
    } else {
      return true;
    }
}