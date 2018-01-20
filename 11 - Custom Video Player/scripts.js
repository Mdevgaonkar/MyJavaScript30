
// get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');
const progress__filled =player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skip__buttons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('input[type="range"]');


//functions
function togglePlay() {
    video.paused? video.play(): video.pause();
}

function updatePlayButton(){
    const icon = this.paused? '►' : '❚❚';
    toggle.textContent = icon;
    
}

function skipVideo() {
    // console.log('skipVideo');
    // console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);    
    
    // video.
}

function handleRangeUpdate() {
    // console.log(this.value);
    video[this.name] = this.value;
}

function updateProgress() {
    // console.log('timeup');
    
    const realProgress = (video.currentTime/video.duration)*100;
    progress__filled.style.flexBasis = `${realProgress}%`;
}

function scrub(e){
    // console.log(e);
    // console.log(e.clientWidth);
    const scrubTime = (e.offsetX/progress.offsetWidth)*video.duration;
    video.currentTime = scrubTime;
    
}

//event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', updateProgress);


toggle.addEventListener('click', togglePlay);
skip__buttons.forEach(skip__button => skip__button.addEventListener('click',skipVideo));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);