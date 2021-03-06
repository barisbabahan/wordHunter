const input = document.querySelector(".btns input");
const canvas = document.getElementById("myCanvas");
const leftTimeTxt = document.querySelector(".timer");
let leftHealth = document.querySelector(".leftHealth");
let score = document.querySelector(".score");
const startBtn = document.querySelector(".start");
let context = canvas.getContext("2d");
let leftTime = 60;
const words = [
  "dilruba",
  "kadim",
  "bilahare",
  "gönüllülük",
  "sevgi",
  "güven",
  "yakamoz",
  "pezevenk",
  "emirgan",
  "çay",
  "mahçubiyet",
  "caymak",
  "sevimli",
  "halis",
  "panda",
  "huzur",
  "onur",
  "gurur",
  "ask",
  "anne",
  "kardes",
  "haz",
  "etmek",
  "yavru",
  "mavi",
  "kumsal",
  "tutku",
  "anne",
  "özlem",
  "başarı",
  "emek",
  "samimiyet",
  "paylaşım",
  "peri",
  "mesele",
  "zira",
];
let currentUsingWords = [];
let indexesOfWords = [];
context.font = "16px Arial";
let createWordInterval;
let updateGameAreaInterval;
let timerInterval;

function startGame() {
  createWordInterval = setInterval(createWord, 1500);
  updateGameAreaInterval = setInterval(updateGameArea, 150);
  timerInterval = setInterval(timer, 1000);
}

function wordComponent(randomWord, xAxis, yAxis, index) {
  this.word = randomWord;
  this.xAxis = xAxis;
  this.yAxis = yAxis;
  this.wordIndex = index;
  this.update = () => {
    context = canvas.getContext("2d");
    context.fillText(this.word, this.xAxis, this.yAxis);
  };
}

function clear() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function updateGameArea() {
  clear();
  currentUsingWords.forEach((wordObj) => {
    wordObj.yAxis += 2;
    if (wordObj.yAxis >= 200) {
      deleteWordAndIndexArr(wordObj.word, wordObj.wordIndex);
      deacreseHealth();
    }
    wordObj.update();
  });
}

function createWord() {
  const randomX = Math.floor(Math.random() * 130);
  const randomNum = Math.floor(Math.random() * words.length);
  const randomWord = words[randomNum];
  if (currentUsingWords.length === 0 && indexesOfWords.length === 0) {
    indexesOfWords.push(randomNum);
    currentUsingWords.push(
      new wordComponent(randomWord, randomX, 10, randomNum)
    );
  } else {
    if (!indexesOfWords.includes(randomNum)) {
      indexesOfWords.push(randomNum);
      currentUsingWords.push(
        new wordComponent(randomWord, randomX, 10, randomNum)
      );
    }
  }
}

$("input").on("textInput", (e) => {
  inputValueKeyCode = e.originalEvent.data.charCodeAt(0);
  if (inputValueKeyCode === 32) {
    const inputValue = input.value.trim();
    isInputMatchWithArr(inputValue.toLowerCase());
    input.value = "";
  }
});

function isInputMatchWithArr(inputValue) {
  currentUsingWords.forEach((wordObj) => {
    if (wordObj.word === inputValue) {
      increaseScore();
      wordObj.yAxis += 200;
      deleteWordAndIndexArr(wordObj.word, wordObj.wordIndex);
    }
  });
}

function deleteWordAndIndexArr(deleteWord, deleteNum) {
  indexesOfWords = indexesOfWords.filter((item) => item !== deleteNum);
  currentUsingWords = currentUsingWords.filter((wordObj) => {
    return wordObj.word != deleteWord;
  });
}

function timer() {
  if (leftTime === 0 || leftHealth.textContent === "0") {
    gameOver();
  }
  leftTimeTxt.textContent = `${leftTime} Sn`;
  leftTime -= 1;
}

function increaseScore() {
  score.textContent = parseInt(score.textContent) + 10;
}

function deacreseHealth() {
  leftHealth.textContent = parseInt(leftHealth.textContent) - 1;
}

function gameOver() {
  clearInterval(createWordInterval);
  clearInterval(updateGameAreaInterval);
  clearInterval(timerInterval);
  startBtn.style.display = "none";
}

function restartGame() {
  location.reload();
}
