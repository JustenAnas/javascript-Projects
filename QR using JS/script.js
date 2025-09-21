let URL = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";
let imgBox = document.querySelector(".imgBox");
let imgId = document.getElementById("imgId");
let text = document.getElementById("text");
let btn = document.getElementById("btn");

function generateQR() {
    if(text.value.trim().length === 0){
        alert("Please enter a valid text or URL");
        text.classList.add("error");
        setTimeout(() => {
            text.classList.remove("error");
        }, 1000);
    }
    else{
        imgId.src  = URL + text.value;

    }
    
}