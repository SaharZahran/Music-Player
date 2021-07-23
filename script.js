'use strict'

const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const auido = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

// Song titles

const songs = ['Emotions', 'Nostaligo', 'Piano', 'Reflections', 'Sad-Piano', 'Teardrops'];

// keep track of a songs

let songIndex = 0;

// Initially load song info DOM
loadSong(songs[songIndex]);

// Update song details

function loadSong(song) {

    title.innerText = song;
    audio.src = `Music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

function playSong() {

musicContainer.classList.add('play');
playBtn.querySelector('i.fas').classList.remove('fa-play');
playBtn.querySelector('i.fas').classList.add('fa-pause');

audio.play();
}

function pauseSong() {
musicContainer.classList.remove('play');
playBtn.querySelector('i.fas').classList.remove('fa-pause');
playBtn.querySelector('i.fas').classList.add('fa-play');

auido.pause();
}

function prevSong() {
  songIndex--;
  
  if(songIndex < 0) {
      songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;

  if(songIndex === songs.length) {
     songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {

    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    auido.currentTime = (clickX / width) * duration;
}

// Event Listeners

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play') ? pauseSong(): playSong();
});

// change song events

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);