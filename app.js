const board = document.createElement("section");
board.classList.add("board");

const result = document.createElement("h2");
result.classList.add("result");

const sound = new Audio("./1.mp3");

const playAgain = document.createElement("button");
playAgain.classList.add("again");

const scoreElement = document.createElement("ul");
scoreElement.classList.add("score");
let score = {
  X: 0,
  O: 0,
};
const scoreX = document.createElement("li");
const scoreO = document.createElement("li");
const showScore = () => {
  scoreX.textContent = ` X score : ${score.X} `;
  scoreO.textContent = ` O score: ${score.O} `;
};

scoreElement.append(scoreX, scoreO);

playAgain.addEventListener("click", () => {
  [...document.querySelectorAll(".box")].map((a, b) => {
    a.textContent = "";
    a.classList.remove("winner");
    gameArray[b] = null;
  });
  winner = null;
  result.textContent = "";
  playAgain.style.display = "none";
});
playAgain.textContent = "Play Again";
playAgain.style.display = "none";

document.body.append(result, scoreElement, board, playAgain);

const gameArray = Array(9).fill(null);
let winner = null;

for (let i = 0; i < gameArray.length; i++) {
  let box = document.createElement("div");
  box.classList.add("box");
  box.addEventListener("click", () => {
    if (gameArray[i] || winner) {
      return;
    }
    box.textContent = "X";
    gameArray[i] = "X";
    checkWinner();
    setTimeout(() => {
      computerMove();
      checkWinner();
    }, 500);
  });

  board.append(box);
}

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinner = () => {
  winningPositions.map((position) => {
    let [a, b, c] = position;
    if (
      gameArray[a] &&
      gameArray[a] === gameArray[b] &&
      gameArray[b] === gameArray[c]
    ) {
      sound.play();
      winner = gameArray[a];
      score[winner]++;
      showScore();
      result.textContent = `${winner} Qalibdir...`;
      playAgain.style.display = "block";
      position.map((index) => {
        document.querySelectorAll(".box")[index].classList.add("winner");
      });
    }
  });

  const emptyBoxes = gameArray.filter((a) => !a);
  if (!emptyBoxes.length && !winner) {
    result.textContent = `Heç-heçə...`;
  }
};

const computerMove = () => {
  const emptyBoxes = gameArray.reduce((acc, value, index) => {
    if (!value) {
      acc.push(index);
    }
    return acc;
  }, []);

  if (emptyBoxes.length === 0) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
  const computerIndex = emptyBoxes[randomIndex];

  gameArray[computerIndex] = "O";
  document.querySelectorAll(".box")[computerIndex].textContent = "O";
};
