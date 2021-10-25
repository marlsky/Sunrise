
/////////////typing//////////////////////////////////////

const texts = ['wschodu', 'zachodu'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';
let isDeleting = false;
let isEnd = false;

function type(){
    if(count === texts.length){
       count = 0; 
    }

    isEnd = false;

    currentText = texts[count];

    if(!isDeleting && index <= currentText.length){
    letter = currentText.slice(0, ++index)
    }

    if(isDeleting && index <= currentText.length){
        letter = currentText.slice(0, --index)    
    }

    if(index === currentText.length){
        isEnd = true;
        isDeleting = true;
    }
        
    if(isDeleting && letter.length === 0){
        isDeleting = false;
        count++  
    }

    document.querySelector('.typing').innerHTML = letter

    const speedUp = Math.random() * (80 - 50) + 50;
    const normal = Math.random() * (300 - 200) + 200;
    const timer = isEnd ? 2000 : isDeleting ? speedUp : normal;
  
        setTimeout(type, timer);
    }

type();



////////////location///////////////////////////////////////

let lat = 52.237049;
let lng = 21.017532;

//////////////////date/////////////////////////////////////

const date = document.querySelector(".date");
formated = new Intl.DateTimeFormat('pl', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});
date.innerHTML = formated.format(new Date());

///////////////////time now///////////////////////////////////////
function now(){
let dt = new Date().toTimeString().slice(0,5)
let time = document.querySelector(".watch");
time.innerHTML = dt
}

setInterval(now, 1000);


//////////////calculate/////////////////////////////////////

const seconds = 1000;
const minute = seconds * 60;
const hour = minute * 60;
const day = hour * 24;


////////////////////////////add 0 /////////////////////////////////////
function pad(value) {

    if(value < 0){
        return value;
    }else{
        if(value < 10) {
            return '0' + value;
        } else {
        return value;
        }
    }
}


///////////////////////////SunRise/////////////////////////////////

function sunRise(){
     return fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=tomorrow&formatted=0`)
        .then(response => response.json())
        .then(results => {
             return results.results.sunrise; 
        });
}

async function countdownRise() {
    const sunrise = await sunRise();
    const countDate =  new Date(sunrise).getTime();
    const now = new Date().getTime();
    const gap = countDate - now;
    
    const textHour = Math.floor((gap % day) / hour)
    const textMinute = Math.floor((gap % hour) / minute)
    const textSeconds = Math.floor((gap % minute) / seconds)

    const sunriseText = document.querySelector(".sunrise");
    sunriseText.innerHTML = `<span>${pad(textHour)}</span>:<span>${pad(textMinute)}</span>:<span>${pad(textSeconds)}</span>`
  }
 setInterval(countdownRise, 1000);

 ////////////////////////SunsSet/////////////////////////////


function sunSet(){
    return fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today&formatted=0`)
       .then(response => response.json())
       .then(results => {
            return results.results.sunset; 
       });
}

async function countdownSet() {
    const sunrise = await sunSet();
    const countDate =  new Date(sunrise).getTime();
    const now = new Date().getTime();
    const gap = countDate - now;
    
    const textHour = Math.floor((gap % day) / hour)
    const textMinute = Math.floor((gap % hour) / minute)
    const textSeconds = Math.floor((gap % minute) / seconds)

    const sunriseText = document.querySelector(".sunset");
    sunriseText.innerHTML = `<span>${pad(textHour)}</span>:<span>${pad(textMinute)}</span>:<span>${pad(textSeconds)}</span>`
    
  }
 setInterval(countdownSet, 1000);