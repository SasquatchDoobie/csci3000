const image_input = document.querySelector("#image_input");
var uploaded_image = "";

image_input.addEventListener("change", function(){
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploaded_image = reader.result;
        document.querySelector("#image_display").style.backgroundImage = `url(${uploaded_image})`

    });
    reader.readAsDataURL(this.files[0]);
})

const image_input1 = document.querySelector("#image_input1");
var uploaded_image1 = "";

image_input1.addEventListener("change", function(){
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploaded_image1 = reader.result;
        document.querySelector("#image_display1").style.backgroundImage = `url(${uploaded_image1})`

    });
    reader.readAsDataURL(this.files[0]);
})

const image_input2 = document.querySelector("#image_input2");
var uploaded_image2 = "";

image_input2.addEventListener("change", function(){
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploaded_image2 = reader.result;
        document.querySelector("#image_display2").style.backgroundImage = `url(${uploaded_image2})`

    });
    reader.readAsDataURL(this.files[0]);
})

const image_input3 = document.querySelector("#image_input3");
var uploaded_image3 = "";

image_input3.addEventListener("change", function(){
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploaded_image3 = reader.result;
        document.querySelector("#image_display3").style.backgroundImage = `url(${uploaded_image3})`

    });
    reader.readAsDataURL(this.files[0]);
})

const image_input4 = document.querySelector("#image_input4");
var uploaded_image4 = "";

image_input4.addEventListener("change", function(){
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploaded_image4 = reader.result;
        document.querySelector("#image_display4").style.backgroundImage = `url(${uploaded_image4})`

    });
    reader.readAsDataURL(this.files[0]);
})

const image_input5 = document.querySelector("#image_input5");
var uploaded_image5 = "";

image_input5.addEventListener("change", function(){
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploaded_image5 = reader.result;
        document.querySelector("#image_display5").style.backgroundImage = `url(${uploaded_image5})`

    });
    reader.readAsDataURL(this.files[0]);
})
