const letters = "abcdefghijklmnopqrstuvwxyz";
const lettersArray = Array.from(letters);
let lettersDiv = document.querySelector(".letters");

lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  let text = document.createTextNode(letter);
  span.appendChild(text);
  span.className = "letter-box";
  lettersDiv.appendChild(span);
});

// create The objects

const words = {
  programming: [
    "Php",
    "Javascript",
    "Go",
    "Scala",
    "Fortran",
    "R",
    "Mysql",
    "Python",
  ],
  movies: [
    "Parasite",
    "Inception",
    "Prestige",
    "Interstellar",
    "Whiplash",
    "Momento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: [
    "Syria",
    "Palestine",
    "Yemen",
    "Egypt",
    "Bahrain",
    "Qatar",
    "Mauritania",
  ],
};

let allKeys = Object.keys(words);
let randomProNumber = Math.floor(Math.random() * allKeys.length);
let randomProName = allKeys[randomProNumber];
let randomProValue = words[randomProName];
let randomValueNumber = Math.floor(Math.random() * randomProValue.length);
let randomValueName = randomProValue[randomValueNumber];

// Set Catagory Info
document.querySelector(".catagory span").innerHTML = randomProName;

// Set Letter guess
let letterGuess = document.querySelector(".letters-guess");

let letterAndSpace = Array.from(randomValueName);
letterAndSpace.forEach((letter) => {
  let emptySpan = document.createElement("span");

  if (letter === " ") {
    emptySpan.className = "has-space";
  }
  letterGuess.appendChild(emptySpan);
});

// Handle clicking on letters
let letterGuesSpan = document.querySelectorAll(".letters-guess span");
let wrongAttemps = 0;
let theDraw = document.querySelector(".hangman-draw");

document.addEventListener("click", (e) => {
  // Set the status
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    let theClickedLetter = e.target.innerHTML.toLowerCase();
    let chosenWord = Array.from(randomValueName.toLowerCase());

    chosenWord.forEach((wordLetter, wordIndex) => {
      if (theClickedLetter == wordLetter) {
        theStatus = true;
        letterGuesSpan.forEach((span, spanIndex) => {
          if (spanIndex === wordIndex) {
            span.innerHTML = wordLetter;
          }
        });
      }
    });
    if (theStatus !== true) {
      wrongAttemps++;
      theDraw.classList.add(`wrong-${wrongAttemps}`);
      document.getElementById("success").play();
      if (wrongAttemps === 8) {
        endGame();
        document.querySelector(".letters").classList.add("finished");
      }
    } else {
      document.getElementById("success").play();
    }
  }
});

function endGame() {
  let div = document.createElement("div");
  div.appendChild(
    document.createTextNode(`Game Over, The Word Is ${randomValueName}`)
  );
  div.className = "popup";
  document.body.appendChild(div);
}
