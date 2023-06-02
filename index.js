const locations = [
    {loc: "Amsterdam",
    gmtoff: 1, 
    img:  'url(./img/amsterdam.jpg)',
    color: 'black'},
    {loc: "Honolulu",
    gmtoff: -10, 
    img:  'url(./img/honolulu.jpg)',
    color: 'black'},
    {loc: "Kiev",
    gmtoff: 2, 
    img:  'url(./img/kiev.jpg)',
    color: 'black'},
    {loc: "London",
    gmtoff: 0, 
    img:  'url(./img/london.jpg)',
    audio: "./auds/london.m4a",
    color: 'black'},
    {loc: "Los Angeles",
    gmtoff: -8, 
    img:  'url(./img/losangeles.jpg)',
    color: 'black'},
    {loc: "New York City",
    gmtoff: -5, 
    img:  'url(./img/nyc.jpg)',
    color: 'orange'},
    {loc: "Sydney",
    gmtoff: 11, 
    img:  'url(./img/sydney.jpg)',
    color: 'black'},
    {loc: "Tokyo",
    gmtoff: 9, 
    img:  'url(./img/tokyo.jpg)',
    audio: "./auds/cherry.m4a",
    color: 'black'},
    {loc: "Vienna",
    gmtoff: 1, 
    img:  'url(./img/vienna2.jpg)',
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

  body.style.backgroundImage = locations[rNum].img;




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
      body.style.backgroundImage = locations[rNum].img;
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

  if(s==0 && m==00){
    let audio = new Audio (locations[rNum].audio);
    audio.play(); 
  }

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