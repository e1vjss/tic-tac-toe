const gameModule = () => {
  let gamePad;
  let quadrants;
  let playerOne;
  let playerTwo;

  let currentPlayer;
  const startButtonGameButton = () => {
    const startButton = document.getElementById("startButton");
    startButton.addEventListener("click", () => {
      playersName();
    });
  };

  const playersName = () => {
    let playerOneInput = document.getElementById("player1NameInput");
    let playerTwoInput = document.getElementById("player2NameInput");
    playerOne = playerFactory(playerOneInput.value, "O");
    playerTwo = playerFactory(playerTwoInput.value, "X");

    if (playerOne.name && playerTwo.name) {
      currentPlayer = playerOne;
      const inputContainer = document.getElementById("playerInputContainer");
      inputContainer.style.visibility = "hidden";
      updateTurnDisplay();
    } else {
      alert("Please fill Player 1 and Player 2 containers.");
    }
  };

  const updateTurnDisplay = () => {
    const turnDisplay = document.getElementById("turnDisplay");
    turnDisplay.style.display = "block";
    turnDisplay.textContent = currentPlayer.name + " make a move";
  };
  const playerFactory = (name, marker) => {
    this.name = name;
    this.marker = marker;
    return {
      name,
      marker,
    };
  };
  const handleQuadrantClick = (event) => {
    const clickedQuadrant = event.target;

    if (clickedQuadrant.innerText === "") {
      // Check if the quadrant is empty
      if (currentPlayer === playerOne) {
        console.log(playerOne.marker);
        clickedQuadrant.innerText = playerOne.marker;
        if (winnerLoser()) {
          setTimeout(() => {
            clearGameboard();
          }, 1000);
        }
  
        currentPlayer = playerTwo;
        updateTurnDisplay();
      } else {
        console.log(playerTwo.marker);
        clickedQuadrant.innerText = playerTwo.marker;
        if (winnerLoser()) {
          setTimeout(() => {
            clearGameboard();
          }, 1000);
        }
  
        currentPlayer = playerOne;
        updateTurnDisplay();
      }

      winnerLoser();
    }
  };

  const winnerLoser = () => {
    const marker = currentPlayer.marker;

    const winningCombinations = [
      // ... (your existing winnin
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal from top-left to bottom-right
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [index1, index2, index3] = combination;
      const quadrant1 = quadrants[index1];
      const quadrant2 = quadrants[index2];
      const quadrant3 = quadrants[index3];

      if (
        quadrant1.innerText === marker &&
        quadrant2.innerText === marker &&
        quadrant3.innerText === marker
      ) {
        if (marker === "X") {
          alert(`${playerTwo.name} wins!`);
        } else {
          alert(`${playerOne.name} wins!`);
        }
        return true
      }
    }
    return false;
  };

  const clearGameboard = () => {
    quadrants.forEach((quadrant) => {
      quadrant.innerText = "";
    });

  const inputContainer = document.getElementById("playerInputContainer");
  inputContainer.style.visibility = "visible";
  const turnDisplay = document.getElementById("turnDisplay");
    turnDisplay.style.display = "none";
    let playerOneInput = document.getElementById("player1NameInput");
  let playerTwoInput = document.getElementById("player2NameInput");
  playerOneInput.value = "";
  playerTwoInput.value = "";

  };

  const initializeGame = () => {
    gamePad = document.getElementById("gameBoard");
    quadrants = gamePad.querySelectorAll(".quadrant");

    startButtonGameButton();

    quadrants.forEach((quadrant) => {
      quadrant.addEventListener("click", handleQuadrantClick);
    });
  };

  return {
    initializeGame,
  };
};

const game = gameModule();
game.initializeGame();
