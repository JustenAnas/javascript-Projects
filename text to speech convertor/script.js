let speech = new SpeechSynthesisUtterance();
speech.volume = 1;  // [0-1]
speech.rate = 1;    // [0.1 - 10]
speech.pitch = 1;   // [0 - 2]

let voices = [];
let voiceSelect = document.querySelector('select'); // matches your HTML <select>
let textInput = document.querySelector('#textInput');
let listenBtn = document.querySelector('#listenBtn');

function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        speech.voice = voices[0]; // default first voice
    }

    // Clear old options
    voiceSelect.innerHTML = "";

    voices.forEach((voice, index) => {
        let option = new Option(voice.name + ` (${voice.lang})`, index);
        voiceSelect.add(option);
    });
}

window.speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

voiceSelect.addEventListener('change', () => {
    speech.voice = voices[Number(voiceSelect.value)];
});

document.body.addEventListener("click", () => {
  let speech = new SpeechSynthesisUtterance();
  speech.text = "Hello bro, this should finally work!";
  speech.lang = "en-US";
  speech.voice = speechSynthesis.getVoices()[0]; // pick first available voice
  window.speechSynthesis.cancel(); // clear queue
  window.speechSynthesis.speak(speech);
  console.log("Speaking with:", speech.voice.name);
});

