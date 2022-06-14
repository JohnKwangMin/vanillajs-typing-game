const TIME_SETTING = 9;
let isPlaying = false;
let score = 0;
let time = TIME_SETTING;
let timeInterval;
let words = [];
const wordDisplay = document.querySelector('.word-display');
const input = document.querySelector('.word-input');
const timeDisplay = document.querySelector('.time');
const scoreDisplay = document.querySelector('.score');
const btn = document.querySelector('.button');

timeDisplay.innerText = time;
scoreDisplay.innerText = score;


const init = ()=>{
  changeText('loading!!')
  getWords();
  input.addEventListener('input',chkMatch);
  chkStatus();

}

const getWords = ()=>{
  axios.get('https://random-word-api.herokuapp.com/word?number=100')
  .then(function (response) {
    // handle success
    console.log(response);
    response.data.forEach((word)=>{
      if(word.length < 10){
        words.push(word);
      }
    })
    changeText('게임시작');
    words = response.data;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

const chkStatus = ()=>{
  if(!isPlaying && time === 0){
    changeText('게임시작')
    clearInterval(timeInterval);
  }
}

const chkMatch = () =>{
  if(input.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
    input.value = "";
    score++;  
    if(!isPlaying){
      return ;
    }
    scoreDisplay.innerText = score;
    time = TIME_SETTING;
    const randomIndex = Math.floor(Math.random() * words.length)
    wordDisplay.innerText = words[randomIndex];
  }
}

const run = ()=> {
  if(isPlaying){
    return ;
  }
  isPlaying = true;
  time = TIME_SETTING;
  input.focus();
  scoreDisplay.innerText = 0;
  timeInterval = setInterval(countDown , 1000);
  changeText('게임중')
}

const countDown = () => {
  time > 0 ? time-- : isPlaying = false;
  if(!isPlaying){
    clearInterval(timeInterval);
  }
  timeDisplay.innerText = time;
}

const changeText = (text) => {
  btn.innerText= text ;
  text === "게임시작" ? btn.classList.remove('loading') : btn.classList.add('loading');
}

changeText("게임시작")

init();