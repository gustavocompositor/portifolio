const tracks = [
  {
    title: "Echoes of the Forgotten Castle",
    audioSrc:
      "audios/castle.wav",
    imageSrc:
      "images/hall.gif",
  },
  {
    title: "Gorilla Fanfarre",
    audioSrc:
      "audios/gorila.wav",
    imageSrc:
      "images/gorilao.gif",
  },
  {
    title: "The Journey - 3 Movements",
    audioSrc:
      "audios/piano.wav",
    imageSrc:
      "images/piano.jpg",
  },
  {
    title: "Serotonin",
    audioSrc:
      "audios/safe.wav",
    imageSrc:
      "images/Safe.png",
  },
  {
    title: "Requiem Prelude",
    audioSrc:
      "audios/galeria.wav",
    imageSrc:
      "images/galeria.jpg",
  },
  {
    title: "Thunderman - World 1",
    audioSrc:
      "audios/thunder.wav",
    imageSrc:
      "images/thundermann.gif",
  },
];

const audioPlayer = document.getElementById("audio-player");
const musicTitle = document.getElementById("music-title");
const background = document.getElementById("background");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

function loadTrack(index) {
  const track = tracks[index];
  musicTitle.textContent = track.title;
  audioPlayer.src = track.audioSrc;
  background.style.backgroundImage = `url(${track.imageSrc})`;
  audioPlayer.play();
}

prevBtn.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) currentIndex = tracks.length - 1;
  loadTrack(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex >= tracks.length) currentIndex = 0;
  loadTrack(currentIndex);
});

loadTrack(currentIndex);

// Piano

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const noteFrequencies = (() => {
  const notes = [];
  for (let i = 0; i < 88; i++) {
    const freq = 27.5 * Math.pow(2, i / 12);
    notes.push(freq);
  }
  return notes;
})();

function playNote(freq) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
}

const piano = document.getElementById("piano");
const whiteOrder = [0, 2, 4, 5, 7, 9, 11];
let whiteKeyIndex = 0;

for (let i = 0; i < 88; i++) {
  const note = i % 12;
  const isWhite = whiteOrder.includes(note);
  const key = document.createElement("div");
  key.classList.add("key", isWhite ? "white" : "black");

  if (!isWhite) {
    // black keys positioned relative to white keys
    const leftPercent = (whiteKeyIndex - 1 + 0.7) * (100 / 52);
    key.style.left = `${leftPercent}vw`;
  } else {
    whiteKeyIndex++;
  }

  key.addEventListener("click", () => {
    if (audioCtx.state === "suspended") audioCtx.resume();
    playNote(noteFrequencies[i]);
  });

  piano.appendChild(key);
}
