console.log("Welcome To Spotify");

//variable declarations
let songindex=0;
let audioelement = new Audio('assets/songs/Bairiya(PagalWorld.com.se).mp3');
let Masterplay =document.getElementById('Masterplay');
let progressbar=document.getElementById('myprogressbar');
let songlist=Array.from(document.getElementsByClassName('songitem'));
let gif=document.getElementById('gif');
let playicon=Array.from(document.getElementsByClassName('playicon'));
let next=document.getElementById('forward');
let previous=document.getElementById('backward');
let mastersongname=document.getElementById('mastersongname');

// song array declaration
let songs = [
    {songname:"Bairiya(PagalWorld.com.se)",filepath:"assets/songs/Bairiya(PagalWorld.com.se).mp3",coverpath:"assets/covers/1.jpg",timestamp:"4:23"},
    {songname:"Chedkhaniyaan(PagalWorld.com.se)",filepath:"assets/songs/Chedkhaniyaan(PagalWorld.com.se).mp3",coverpath:"assets/covers/2.jpg",timestamp:"3:51"},
    {songname:"Deva Deva(PagalWorld.com.se)",filepath:"assets/songs/Deva Deva(PagalWorld.com.se).mp3",coverpath:"assets/covers/3.jpg",timestamp:"4:39"},
    {songname:"Hum Nashe Mein Toh Nahin(PagalWorld.com.se)",filepath:"assets/songs/Hum Nashe Mein Toh Nahin(PagalWorld.com.se).mp3",coverpath:"assets/covers/4.jpg",timestamp:"3:58"},
    {songname:"Lambiyaan Si Judaiyaan(PagalWorld.com.se)",filepath:"assets/songs/Lambiyaan Si Judaiyaan(PagalWorld.com.se).mp3",coverpath:"assets/covers/5.jpg",timestamp:"3:58"},
    {songname:"Malang Sajna(PagalWorld.com.se)",filepath:"assets/songs/Malang Sajna(PagalWorld.com.se).mp3",coverpath:"assets/covers/6.jpg",timestamp:"2:37"},
    {songname:"Mere Dholna (Fan Edit)(PagalWorld.com.se)",filepath:"assets/songs/Mere Dholna (Fan Edit)(PagalWorld.com.se).mp3",coverpath:"assets/covers/7.jpg",timestamp:"6:28"},
    {songname:"Pyaar Hota Kayi Baar Hai(PagalWorld.com.se)",filepath:"assets/songs/Pyaar Hota Kayi Baar Hai(PagalWorld.com.se).mp3",coverpath:"assets/covers/8.jpg",timestamp:"3:03"},
    {songname:"Rasiya Reprise(PagalWorld.com.se)",filepath:"assets/songs/Rasiya Reprise(PagalWorld.com.se).mp3",coverpath:"assets/covers/9.jpg",timestamp:"4:45"},
    {songname:"Tera Yaar Hoon Main(PagalWorld.com.se)",filepath:"assets/songs/Tera Yaar Hoon Main(PagalWorld.com.se).mp3",coverpath:"assets/covers/10.jpg",timestamp:"4:24"},
]

// song list presenting
songlist.forEach((Element,i)=>{
    Element.getElementsByTagName('img')[0].src=songs[i].coverpath;
    Element.getElementsByClassName('songname')[0].innerHTML=songs[i].songname;
    Element.getElementsByClassName('timestamp')[0].innerText=songs[i].timestamp;
})

// handle play/pause of the player
Masterplay.addEventListener('click',()=>{
    if(audioelement.paused || audioelement.currentTime<=0){
        audioelement.play();
        Masterplay.classList.remove('fa-circle-play');
        Masterplay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
        for (let index = 0; index <=10; index++) {
            if(index==songindex){
                document.getElementById(index).classList.remove('fa-circle-play');
                document.getElementById(index).classList.add('fa-circle-pause');
                updatemastersongname(songindex);
            }
        }
    }
    else{
        audioelement.pause();
        Masterplay.classList.remove('fa-circle-pause');
        Masterplay.classList.add('fa-circle-play');
        gif.style.opacity=0;
        makeallplays();
    }
})

// update seekbar
audioelement.addEventListener('timeupdate',()=>{
    progress =parseInt((audioelement.currentTime/audioelement.duration)*100);
    progressbar.value=progress;
})

progressbar.addEventListener('change',()=>{
    audioelement.currentTime=(progressbar.value*audioelement.duration/100);
})

//functions
const makeallplays=()=>{
    playicon.forEach((Element)=>{
        Element.classList.remove('fa-circle-pause');
        Element.classList.add('fa-circle-play');
    })
}

const updatemastersongname =(Element)=>{
    mastersongname.innerText=songs[Element].songname;
}

//backend of play icon of every song in song list
playicon.forEach((Element)=>{
    Element.addEventListener('click',(e)=>{
        makeallplays();
        songindex=parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioelement.src =`assets/songs/${songs[songindex].songname}.mp3`;
        audioelement.currentTime=0;
        audioelement.play();
        Masterplay.classList.remove('fa-circle-play');
        Masterplay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
        updatemastersongname(songindex);
    })
})

// for next song
next.addEventListener('click',()=>{
    if(songindex>=10){
        songindex=0;
    }
    else{
        songindex+=1;
    }
    audioelement.src =`assets/songs/${songs[songindex].songname}.mp3`;
        audioelement.currentTime=0;
        audioelement.play();
        Masterplay.classList.remove('fa-circle-play');
        Masterplay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
        for (let index = 0; index <=10; index++) {
            if(index==songindex){
                makeallplays();
                document.getElementById(index).classList.remove('fa-circle-play');
                document.getElementById(index).classList.add('fa-circle-pause');
            }
        }
        updatemastersongname(songindex);
})

// for previous song
previous.addEventListener('click',()=>{
    if(songindex<=0){
        songindex=0;
    }
    else{
        songindex-=1;
    }
    audioelement.src =`assets/songs/${songs[songindex].songname}.mp3`;
        audioelement.currentTime=0;
        audioelement.play();
        Masterplay.classList.remove('fa-circle-play');
        Masterplay.classList.add('fa-circle-pause');
        gif.style.opacity=1;

        for (let index = 0; index <=10; index++) {
            if(index==songindex){
                makeallplays();
                document.getElementById(index).classList.remove('fa-circle-play');
                document.getElementById(index).classList.add('fa-circle-pause');
            }
        }
        updatemastersongname(songindex);
})
