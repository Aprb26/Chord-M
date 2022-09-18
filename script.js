console.log("Welcome to Chord-M");

// initialise the variables 
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Let me love you", filePath: "song/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Allah Hafiz", filePath: "song/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Dil Ibaadat - Tum Mile 128 Kbps", filePath: "song/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Dil Kyun Yeh Mera - Kites 128 Kbps", filePath: "song/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Dilnashin Dilnashin", filePath: "song/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Dus Bahane", filePath: "song/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Guzaarish - Guzaarish", filePath: "song/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Kabhi Aayine Pe Likha Tujhe 128 Kbps", filePath: "song/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Kya Mujhe Pyaar Hai - Woh Lamhe 128 Kbps", filePath: "song/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Labon Ko", filePath: "song/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    // element.getElementsByClassName("timestamp")[0].innerText = songs[i].filePath.duration();
})


// handle pause/play click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        sg = document.getElementById(songIndex.toString());
        sg.classList.remove('fa-circle-play');
        sg.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        sg = document.getElementById(songIndex.toString());
        sg.classList.remove('fa-circle-pause');
        sg.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

// listen to events
audioElement.addEventListener('timeupdate', ()=>{
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value *audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        songIndex = parseInt(e.target.id);
        if((audioElement.paused ) || songs[songIndex].songName!=masterSongName.innerText){
            makeAllPlays();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = 'songs/'+(songIndex+1).toString()+'.mp3';
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            audioElement.play();
            gif.style.opacity = 1;
        }
        else{
            audioElement.pause();
            makeAllPlays();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;

        }
    })
})


document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = 'songs/'+(songIndex+1).toString()+'.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    audioElement.play();
    gif.style.opacity = 1;
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 9;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = 'songs/'+(songIndex+1).toString()+'.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    audioElement.play();
    gif.style.opacity = 1;
})

