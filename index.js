// const winningNumber = 20;
// const guessNumber = +prompt("Guess Your Number");

// if (guessNumber === winningNumber) {
//   alert(
//     "You win this prize" +
//       " , " +
//       winningNumber +
//       " " +
//       " is your winning number"
//   );
// } else if (!guessNumber) {
//   alert("enter your winning number");
// } else if (guessNumber < winningNumber) {
//   alert("your the low number");
// } else if (guessNumber > winningNumber) {
//   alert("your number is more than winning number");
// }

// start game logic
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGamebtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let Draw = document.querySelector(".Draw");

let turn = true;

let winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
let DrawMove = [
  [0, 0],
  [1, 1],
  [2, 0],
  [1, 0],
  [1, 2],
  [2, 1],
  [0, 1],
  [0, 2],
  [2, 2],
];
const resetGame = () => {
  turn = true;
  EnableBox();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn) {
      //player: 1
      box.innerHTML = "X";
      turn = false;
    } else {
      //player : 2
      box.innerHTML = "O";
      turn = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const disableBox = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const EnableBox = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerHTML = "";
  }
};

const showWinnwer = (winner) => {
  msg.innerHTML = `Congrulations😎😎 The winner is ${winner} 😁🏆 `;
  msgContainer.classList.remove("hide");
  disableBox();
};
const Drawn = () => {
  Draw.innerHTML = "Draw";
  Draw.classList.remove("hide");
  disableBox();
};

const checkWinner = () => {
  let hasWinner = false;

  // Check for a win
  for (let pattern of winPattern) {
    let posval = boxes[pattern[0]].innerText;
    let posva2 = boxes[pattern[1]].innerText;
    let posva3 = boxes[pattern[2]].innerText;

    if (posval !== "" && posva2 !== "" && posva3 !== "") {
      if (posval === posva2 && posva2 === posva3) {
        showWinnwer(posval);
        hasWinner = true;
        break; // exit the loop once a winner is found
      }
    }
  }

  // If there is no winner, check for a draw
  if (!hasWinner) {
    let isDraw = true;
    for (let box of boxes) {
      if (box.innerText === "") {
        isDraw = false;
        break;
      }
    }
    if (isDraw) {
      Drawn();
    }
  }
};

newGamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", EnableBox);
