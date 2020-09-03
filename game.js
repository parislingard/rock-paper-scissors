var buttons = document.querySelectorAll("button");
var leftEmoji = document.querySelector("#left-emoji");
var rightEmoji = document.querySelector("#right-emoji");
var emojis = document.querySelectorAll(".emoji");
var playerScoreCard = document.querySelector("#left-score");
var computerScoreCard = document.querySelector("#right-score");
var p = document.querySelector("p");
var playAgain = document.createElement("button");
var playArea = document.querySelector(".play-area");

playAgain.textContent = "Play again?";

playAgain.addEventListener("click", () => {
    playerScoreCard.textContent = 0;
    computerScoreCard.textContent = 0;
    p.textContent = "First to 5 points wins!";
    playArea.removeChild(playAgain);
    emojis.forEach((emoji) => emoji.classList.remove("visible"));
    buttons.forEach((button) => button.style.display = "initial");
});

// randomly returns 0, 1, or 2
function rNG3() {
    return Math.floor(Math.random()*3);
}

// randomly returns "Rock", "Paper", or "Scissors"
function computerPlay() {
    switch (rNG3()) {
        case 0: return "rock";
        case 1: return "paper";
        case 2: return "scissors";
    }
}

// returns true if and only if player wins, returns false if player loses or ties
function isPlayerWin(playerSelection, computerSelection) {
    switch(playerSelection) {
        case "rock": return computerSelection == "scissors";
        case "paper": return computerSelection == "rock";
        case "scissors": return computerSelection == "paper";
    }
}

function isTie(playerSelection, computerSelection) {
    return playerSelection == computerSelection;
}

function playRoundHelper(playerSelection, computerSelection) {
    if (isPlayerWin(playerSelection, computerSelection)) return "win";
    else if (isTie(playerSelection, computerSelection)) return "tie";
    return "lose";
}

function handleResult() {
    const playerScore = Number(playerScoreCard.textContent);
    const computerScore = Number(computerScoreCard.textContent);
    if (playerScore == 5 || computerScore == 5) {
        if (playerScore > computerScore) p.textContent = "You won!";
        else p.textContent = "You lost...";
        playArea.appendChild(playAgain);
        buttons.forEach((button) => button.style.display = "none");
    }
}

function addPoint(scoreCard) {
    var score = Number(scoreCard.textContent);
    scoreCard.textContent = ++score;
}

function playRound(playerSelection, computerSelection) {
    const result = playRoundHelper(playerSelection, computerSelection);
    switch (result) {
        case "win": addPoint(playerScoreCard);
            break;
        case "tie": break;
        case "lose": addPoint(computerScoreCard);
            break;
    }
    handleResult();
}

function changeEmoji(selection, emoji) {
    switch(selection) {
        case "rock": emoji.innerHTML = "✊";
        break;
        case "paper": emoji.innerHTML = "✋";
        break;
        case "scissors": emoji.innerHTML = "✌";
        break;
    }
}

function removeTransition() {
    this.classList.remove("chosenEmoji");
}

emojis.forEach((emoji) => emoji.addEventListener("transitionend", removeTransition));

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const playerSelection = button.id;
        const computerSelection = computerPlay();
        changeEmoji(playerSelection, leftEmoji);
        changeEmoji(computerSelection, rightEmoji);
        emojis.forEach((emoji) => {
            emoji.classList.add("visible", "chosenEmoji");
        });
        playRound(playerSelection, computerSelection);
    });
});