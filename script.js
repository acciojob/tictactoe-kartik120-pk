document.getElementById("submit").addEventListener("click", function () {
    let player1 = document.getElementById("player1").value.trim();
    let player2 = document.getElementById("player2").value.trim();

    if (player1 === "" || player2 === "") {
        alert("Please enter names for both players!");
        return;
    }

    document.getElementById("player-form").classList.add("hidden");
    document.getElementById("game-board").classList.remove("hidden");

    startGame(player1, player2);
});

function startGame(player1, player2) {
    let message = document.querySelector(".message");
    let currentPlayer = "X";
    let currentUser = player1;
    let gameActive = true;
    let boardState = ["", "", "", "", "", "", "", "", ""];
    let cells = document.querySelectorAll(".cell");

    message.textContent = `${currentUser}, you're up!`;

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6] 
        ];

        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                gameActive = false;
                setTimeout(() => {
                    message.textContent = `${currentUser} congratulations you won!`;
                }, 100); // Ensures Cypress detects update
                return true;
            }
        }
        return false;
    }

    function checkDraw() {
        return boardState.every(cell => cell !== "");
    }

    cells.forEach((cell, index) => {
        cell.textContent = "";
        cell.classList.remove("taken");

        cell.addEventListener("click", function () {
            if (!gameActive || cell.textContent !== "") return;

            boardState[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add("taken");

            if (checkWinner()) return;

            if (checkDraw()) {
                message.textContent = "It's a Draw!";
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";
            currentUser = currentPlayer === "X" ? player1 : player2;
            message.textContent = `${currentUser}, you're up!`;
        });
    });

    document.getElementById("restart").addEventListener("click", function () {
        boardState.fill("");
        gameActive = true;
        message.textContent = `${player1}, you're up!`;
        currentPlayer = "X";
        currentUser = player1;

        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("taken");
        });
    });
}
