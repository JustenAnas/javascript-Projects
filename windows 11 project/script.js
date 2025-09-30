let start = document.getElementsByClassName("startMenu")[0];
let taskbar = document.getElementsByClassName("taskbar")[0];
let chromeicon = document.getElementsByClassName("chromeicon")[0];
let edge = document.getElementsByClassName("edgeicon")[0];
let edge2 = document.getElementsByClassName("edgeicon2")[0];
 
 
 taskbar.addEventListener("click", ()=>{
     if(start.style.bottom == "50px"){
        start.style.bottom = "-600px"
     }
     else{
        start.style.bottom = "50px"
     }
 })

    chromeicon.addEventListener("click", ()=>{
        window.open("https://www.google.com/chrome/", "_blank");
    })
    edge.addEventListener("click",()=>{
        window.open("https://www.microsoft.com/edge", "_blank");
    })
    edge2.addEventListener("click",()=>{
        window.open("https://www.microsoft.com/edge", "_blank");
    })