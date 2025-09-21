console.log("script linked");

let result = {
  "email": "support@emailvalidation.io",
  "user": "support",
  "tag": "",
  "domain": "emailvalidation.io",
  "smtp_check": true,
  "mx_found": true,
  "did_you_mean": "",
  "role": true,
  "disposable": false,
  "score": 0.64,
  "state": "deliverable",
  "reason": "valid_mailbox",
  "free": false,
  "format_valid": true,
  "catch_all": null
}

let submitBtn = document.getElementById("submit-btn");
let resultCont = document.getElementById("resultCont");

submitbtn.addEventListener("click",async(e)=>{
    console.log("clicked");
    e.preventDefault()
   resultCont.innerHTML = `<img src="Spinner@1x-1.0s-200px-200px.svg" alt="Loading..." />`;

let  key = "ema_live_qp4fZjSB2KPFEBG0yBjXfZwHXQu7u9CvNTSgNWe9"

let email = document.getElementById("username").value

let  URL = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`
let res = await fetch(URL)
let result = await res.json()
let str =``
for(key of Object.keys(result)){
    str = str + `<div>${key} : ${result[key]}</div>`
}
console.log(str);
resultCont.innerHTML = str
})

