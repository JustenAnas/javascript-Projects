const songRows = document.querySelectorAll(".song-row");

const nowPlaying = document.querySelector(".footer-now-playing");
const footerCover = document.querySelector(".footer-song-cover");
const footerTitle = document.querySelector(".footer-song-title");
const footerArtist = document.querySelector(".footer-song-artist");
const audio = new Audio();

let currentIndex = 0;

songRows.forEach((songRow, index) => {
  songRow.addEventListener("click", () => {
    // currentIndex = index;
    const songCover = songRow.querySelector(".song-cover");
    const songTitle = songRow.querySelector(".song-title");
    const songArtist = songRow.querySelector(".song-artist");
    console.log(
      `Cover: ${songCover.src}`,
      `Title: ${songTitle.textContent}`,
      `Artist: ${songArtist.textContent}`
    );

    // 🔽 Add this part to update the footer
    footerCover.src = songCover.src;
    footerTitle.textContent = songTitle.textContent;
    footerArtist.textContent = songArtist.textContent;

    // 🔽 Make the now-playing section visible
  nowPlaying.classList.add("active");


    // 🔽 Set the audio source and play the song
    const audioSrc = songRow.dataset.audio;
    audio.src = audioSrc;
    audio.play();
    console.log(`Playing audio from: ${audioSrc}`);
  });
});

// Footer controls
let isRepeat = false;
const shuffleBtn = document.querySelector(".shuffle-btn");
const previousBtn = document.querySelector(".previous-btn");
const mainPlayBtn = document.querySelector(".play-main");
const nextBtn = document.querySelector(".next-btn");
const repeatBtn = document.querySelector(".repeat-btn");

// play btn logic here

mainPlayBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    mainPlayBtn.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  <circle cx="24" cy="24" r="22" stroke="black" stroke-width="2" fill="white"/>
  <rect x="17" y="16" width="5" height="16" fill="black"/>
  <rect x="26" y="16" width="5" height="16" fill="black"/>
</svg>
`;
  } else {
    audio.pause();
 mainPlayBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="22" stroke="black" stroke-width="2" fill="white"/>
          <polygon points="19,16 19,32 33,24" fill="black"/>
        </svg>`;
  }
});

// previous btn logic here

previousBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex = currentIndex - 1;
  } else {
    currentIndex = songRows.length - 1; // go to last song if already at first
  }

  songRows[currentIndex].click();
});

// next btn logic here

nextBtn.addEventListener("click", () => {
  if (currentIndex < songRows.length - 1) {
    currentIndex = currentIndex + 1;
  } else {
    currentIndex = 0; // go to last song if already at first
  }
  songRows[currentIndex].click();
});

// shufflebtn here 
shuffleBtn.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random()*songRows.length);
    currentIndex = randomIndex;
    songRows[currentIndex].click();
     shuffleBtn.classList.toggle("active");
})

// repeat btn logic here

repeatBtn.addEventListener("click", () => {
  if (isRepeat) {
    isRepeat = false;
    repeatBtn.classList.remove("active");
  } else {
    isRepeat = true;
    repeatBtn.classList.add("active");
  }
   repeatBtn.classList.toggle("active");
});

audio.addEventListener("ended", () => {
  if (isRepeat) {
    audio.currentTime = 0;
    audio.play();
  } else {
    if (currentIndex < songRows.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    songRows[currentIndex].click();
  }
});

const progressBar = document.querySelector(".progress-bar");
const currentTimeSpan = document.querySelector(".current-time");
const durationSpan = document.querySelector(".duration");

// Update duration when metadata loads
audio.addEventListener('loadedmetadata', () => {
  const totalSeconds = Math.floor(audio.duration);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  durationSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  progressBar.max = Math.floor(audio.duration);
});


// Update current time while playing
audio.addEventListener('timeupdate', () => {
  const currentSeconds = Math.floor(audio.currentTime);
  const minutes = Math.floor(currentSeconds / 60);
  const seconds = currentSeconds % 60;
  currentTimeSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  progressBar.value = currentSeconds;
});

// Seeking
progressBar.addEventListener('input', () => {
  audio.currentTime = progressBar.value;
  console.log(audio.duration)

  console.log("Current index:", currentIndex);
console.log("Audio duration:", audio.duration);
console.log("Audio currentTime:", audio.currentTime);
console.log("Progress max:", progressBar.max);
console.log("Progress value:", progressBar.value);
});


