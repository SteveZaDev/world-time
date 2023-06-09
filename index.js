const locations = [
    {loc: "Amsterdam",
    gmtoff: 1, 
    dst: 'yes',
    landscapeImg:  ['url(./img/amsterdam.jpg)'],
    portraitImg:  ['url(./img/amsterdam.jpg)'],
    audio: "./auds/london.m4a",
    color: 'black'},
    {loc: "Honolulu",
    gmtoff: -10, 
    dst: 'no',
    landscapeImg:  ['url(./img/honolulu.jpg)'],
    portraitImg:  ['url(./img/honolulu.jpg)'],
    audio: "./auds/london.m4a",
    color: 'black'},
    {loc: "Kyiv",
    gmtoff: 2,
    dst: 'yes', 
    landscapeImg:  ['url(./img/kiev.jpg)'],
    portraitImg:  ['url(./img/kiev.jpg)'],
    audio: "./auds/london.m4a",
    color: 'black'},
    {loc: "London",
    gmtoff: 0, 
    dst: 'yes',
    landscapeImg:  ['url(./img/london.jpg)'],
    portraitImg:  ['url(./img/london.jpg)'],
    audio: "./auds/london.m4a",
    color: 'black'},
    {loc: "Los Angeles",
    gmtoff: -8,
    dst: 'yes', 
    landscapeImg:  ['url(./img/losangeles.jpg)'],
    portraitImg:  ['url(./img/losangeles.jpg)'],
    audio: "./auds/london.m4a",
    color: 'black'},
    {loc: "New York City",
    gmtoff: -5, 
    dst: 'yes',
    landscapeImg:  ['url(./img/nyc.jpg)'],
    portraitImg:  ['url(./img/tokyo.jpg)'],
    audio: "./auds/london.m4a",
    color: 'orange'},
    {loc: "Sydney",
    gmtoff: 11,
    dst: 'opp', 
    landscapeImg:  ['url(./img/sydney.jpg)'],
    portraitImg:  ['url(./img/sydney.jpg)'],
    audio: "./auds/london.m4a",
    color: 'black'},
    {loc: "Tokyo",
    gmtoff: 9, 
    dst: 'no',
    landscapeImg:  ['url(./img/tokyo.jpg)'],
    portraitImg:  ['url(./img/tokyo.jpg)'],
    audio: "./auds/cherry.m4a",
    color: 'black'},
    {loc: "Vienna",
    gmtoff: 1, 
    dst: 'yes',
    landscapeImg:  ['url(./img/vienna2.jpg)'],
    portraitImg:  ['url(./img/vienna2.jpg)'],
    audio: "./auds/london.m4a",
    color: 'black'}
]



const hourEl = document.getElementById('hour');
const minuteEl = document.getElementById('minutes');
const secondEl = document.getElementById('seconds');
const ampmEl = document.getElementById('ampm');
const locationEl = document.getElementById('location');

const formEl = document.getElementById("form")
const inputEl = document.getElementById("input")

const body = document.getElementsByTagName('body')[0];



let sound = false;
let soundPlayer = "";
let imgX = 0;
//let audioName = audios[randomAudioIdx].name;






const ham = document.getElementById("ham");
const navbar = document.getElementById("navbar");
const close = document.getElementById("close-help");
const helpbox = document.getElementById("help-box");

ham.addEventListener("click", () => {
  navbar.classList.toggle("active");
  ham.classList.toggle("active");
});

close.addEventListener("click", () => {
  close.classList.toggle("hidden");
  helpbox.classList.toggle("hidden");
});


  // GET ARRAY INDEX OF NYC and set it to rNum

  function checkLoc(startLoc) {
    return startLoc.loc === "New York City";
  }
  let rNum = locations.findIndex(checkLoc);
  console.log(rNum);

 // let rNum = 2;
  let nav = document.getElementById('navbar');

  if (window.innerHeight > window.innerWidth){
  body.style.backgroundImage = locations[rNum].portraitImg[imgX];
  } else {
    body.style.backgroundImage = locations[rNum].landscapeImg[imgX];
    }
  soundPlayer = new Audio (locations[rNum].audio);
  soundPlayer.loop = true;
  soundPlayer.volume = .55
  soundPlayer.currentTime = 1; 

  initAudio();


  console.log ("reached here")
 // body.style.backgroundImage = "url(https://cdn.pixabay.com/photo/2022/11/08/06/26/woman-7577808_960_720.jpg)"

  locations.forEach((location) => {
    console.log(location.loc);
    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.innerText = location.loc;
    nav.append(btn);
    console.log(nav);
 
  

    
    btn.addEventListener("click", () => {
      console.log (location.loc);
      rNum = 1;
      rNum = locations.map(x => x.loc).indexOf(location.loc)
      navbar.classList.toggle("active");
      ham.classList.toggle("active");
      body.style.backgroundImage = locations[rNum].landscapeImg[0];
      soundPlayer.setAttribute('src',locations[rNum].audio); //change the source
      playMusic();

      setInterval(updateClock, 1000);
    });

 //   document.body.appendChild(btn);
  });

















function updateClock() {

  let currentTime = new Date();
  let dst = 0;
  if (isDST(currentTime)){
    dst = 1;
  }

  // Call Function passing in GMT offset to get correct time 
  currentTime = getTime(locations[rNum].gmtoff + dst);
  console.log("currenttime = " + currentTime)






  let h = currentTime.getHours();
  let m = currentTime.getMinutes();
  let s = currentTime.getSeconds();
/*
  if(s==0 && m==00){
    let audio = new Audio (locations[rNum].audio);
    audio.play(); 
  }
*/
/*
  if(s==00){
    let audio = new Audio (locations[rNum].audio);
    audio.play(); 
  }
*/
/*  let h = new Date().getHours();
  let m = new Date().getMinutes();
  let s = new Date().getSeconds();*/
  let ampm = "AM";

  if(h > 12){
    h = h - 12;
    ampm = "PM";
  } 

  if(h === 0){
    h = 12;
    ampm = "AM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  locationEl.innerText = locations[rNum].loc;  
  hourEl.innerText = h;
  minuteEl.innerText = m;
  secondEl.innerText = s;
  ampmEl.innerText = ampm;

  setTimeout(()=>{updateClock()}, 1000);
}

updateClock();

function getTime(offset)
        {
            var d = new Date();
            localTime = d.getTime();
            localOffset = d.getTimezoneOffset() * 60000;

            // obtain UTC time in msec
            utc = localTime + localOffset;
            // create new Date object for different city
            // using supplied offset
            var nd = new Date(utc + (3600000*offset));
            console.log("time in ms = " + nd);
            return nd;
            //nd = 3600000 + nd;
            utc = new Date(utc);
            // return time as a string
            $("#local").html(nd.toLocaleString());
            $("#utc").html(utc.toLocaleString());
        }

        formEl.addEventListener("submit", () => {
          const userAns = inputEl.value;
          console.log("user ans  = " + userAns)
          console.log ("reached here")
          
          body.style.backgroundImage =   "url('https://sebhastian.com/img/default.png')";
        });


        function isDST(d) {
          let jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
          let jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
          return Math.max(jan, jul) !== d.getTimezoneOffset();    
      }



// swiped-left
document.addEventListener('swiped-left', function(e) {
  console.log("swiped left")
  if (rNum === (locations.length - 1)){
    rNum = 0; 
  } else {
    rNum++;
  }
  body.style.backgroundImage = locations[rNum].landscapeImg[0];
  soundPlayer.setAttribute('src',locations[rNum].audio); //change the source
  playMusic();
});
// swiped-right
document.addEventListener('swiped-right', function(e) {
  console.log("swiped right")


  if (rNum === 0){
    rNum = locations.length - 1; 
  } else {
    rNum--;
  }
  body.style.backgroundImage = locations[rNum].landscapeImg[0];
  soundPlayer.setAttribute('src',locations[rNum].audio); //change the source
  playMusic();
});
// swiped-up
document.addEventListener('swiped-up', function(e) {
  console.log("swiped up")
  return;

//  soundPlayer.play();
//  setInterval(updateClock, 1000);

  if (rNum === (locations.length - 1)){
    rNum = 0; 
  } else {
    rNum++;
  }
  body.style.backgroundImage = locations[rNum].landscapeImg[0];
  soundPlayer.setAttribute('src',locations[rNum].audio); //change the source
  playMusic();
  
});
// swiped-down
document.addEventListener('swiped-down', function(e) {
  console.log("swiped down")
  return;


  if (rNum === 0){
    rNum = locations.length - 1; 
  } else {
    rNum--;
  }
  body.style.backgroundImage = locations[rNum].landscapeImg[0];
  soundPlayer.setAttribute('src',locations[rNum].audio); //change the source
  playMusic();

});




// Added on 6/9/23
function initAudio(){
  let icon = document.querySelector(".fa-volume-off");
  
  icon.onclick = function (){
      music();
      console.log("classlist when clicked = " + icon.classList)
      if(icon.classList.contains("fa-volume-up")){
          icon.classList.replace("fa-volume-up", "fa-volume-off");
      }
      else{
          icon.classList.replace("fa-volume-off", "fa-volume-up");
      }
  }
  }
  
  
  function music(){
    console.log("entered music toggle")
    sound = !sound;
    if (sound===false){
      if (soundPlayer){
        soundPlayer.pause();
      }
    }
    if (sound===true){
      if (soundPlayer){
        soundPlayer.play();
      }
    }
  }
  
  
  function playMusic(){
    if (sound){
    soundPlayer.play();
    }
  }
  
  