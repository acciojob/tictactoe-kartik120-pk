document.addEventListener("DOMContentLoaded", function () {
    let currentPlayer = "X";
    let player1Name = "";
    let player2Name = "";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = false;

    const messageDiv = document.querySelector(".message");

    // Start game when players enter names
    document.getElementById("submit").addEventListener("click", function () {
        player1Name = document.getElementById("player1").value.trim() || "Player 1";
        player2Name = document.getElementById("player2").value.trim() || "Player 2";

        document.getElementById("game").style.display = "block";
        messageDiv.textContent = `${player1Name}, you're up`;
        gameActive = true;
    });

    // Handle cell clicks
    document.querySelectorAll(".cell").forEach(cell => {
        cell.addEventListener("click", function () {
            if (!gameActive || this.classList.contains("taken")) return;

            let cellIndex = parseInt(this.id) - 1;
            gameBoard[cellIndex] = currentPlayer;
            this.textContent = currentPlayer;
            this.classList.add("taken");

            setTimeout(() => {
                if (checkWinner()) {
                    messageDiv.textContent = `${currentPlayer === "X" ? player1Name : player2Name} congratulations you won!`;
                    gameActive = false;
                    return;
                }

                currentPlayer = currentPlayer === "X" ? "O" : "X";
                messageDiv.textContent = `${currentPlayer === "X" ? player1Name : player2Name}, you're up`;
            }, 100);
        });
    });

    // Check for a winner
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winPatterns.some(pattern =>
            gameBoard[pattern[0]] &&
            gameBoard[pattern[0]] === gameBoard[pattern[1]] &&
            gameBoard[pattern[1]] === gameBoard[pattern[2]]
        );
    }
});
