// Початкові змінні
let board = ["", "", "", "", "", "", "", "", ""]; // Поле гри
let currentPlayer = "X"; // Поточний гравець
let gameActive = true; // Чи гра активна

// Функція для перевірки переможця
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Рядки
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Стовпці
    [0, 4, 8], [2, 4, 6]             // Діагоналі
  ];

  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Повертаємо переможця (X або O)
    }
  }

  if (!board.includes("")) {
    return "draw"; // Нічия
  }

  return null; // Переможця немає
}

// Функція для обробки кліку по клітинці
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute("data-index");

  // Перевіряємо, чи клітинка вже зайнята або гра завершена
  if (board[index] !== "" || !gameActive) {
    return;
  }

  // Заповнюємо клітинку символом поточного гравця
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  // Перевіряємо, чи є переможець
  const winner = checkWinner();
  if (winner) {
    gameActive = false;
    if (winner === "draw") {
      document.getElementById("message").textContent = "Нічия!";
    } else {
      document.getElementById("message").textContent = `Переміг гравець ${winner}!`;
    }
  } else {
    // Змінюємо гравця
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

// Додаємо обробник подій для клітинок
const cells = document.querySelectorAll(".cell");
cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});