//your JS code here. If required.
document.getElementById("submit").addEventListener("click", function () {
    const player1 = document.getElementById("player-1").value.trim();
    const player2 = document.getElementById("player-2").value.trim();

    if (player1 === "" || player2 === "") {
        alert("Please enter names for both players.");
        return;
    }

    document.getElementById("player-input").style.display = "none";
    document.getElementById("game-board").style.display = "block";

    startGame(player1, player2);
});

function startGame(player1, player2) {
    let currentPlayer = player1;
    let currentSymbol = "X";
    const messageDiv = document.querySelector(".message");
    messageDiv.textContent = `${currentPlayer}, you're up!`;

    const board = Array(9).fill(null);
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell) => {
        cell.textContent = "";
        cell.addEventListener("click", function () {
            if (!cell.textContent && !checkWinner(board)) {
                board[cell.id - 1] = currentSymbol;
                cell.textContent = currentSymbol;

                if (checkWinner(board)) {
                    messageDiv.textContent = `${currentPlayer}, congratulations you won! 🎉`;
                    return;
                }

                if (!board.includes(null)) {
                    messageDiv.textContent = "It's a draw!";
                    return;
                }

                currentPlayer = currentPlayer === player1 ? player2 : player1;
                currentSymbol = currentSymbol === "X" ? "O" : "X";
                messageDiv.textContent = `${currentPlayer}, you're up!`;
            }
        });
    });

    document.getElementById("reset").addEventListener("click", function () {
        board.fill(null);
        cells.forEach((cell) => (cell.textContent = ""));
        messageDiv.textContent = `${player1}, you're up!`;
        currentPlayer = player1;
        currentSymbol = "X";
    });
}

function checkWinner(board) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some((combination) => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}
