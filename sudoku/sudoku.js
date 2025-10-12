document.addEventListener("DOMContentLoaded", () => {
  // DOM要素の取得
  const boardElement = document.getElementById("sudoku-board");
  const numberPalette = document.getElementById("number-palette");
  const newGameBtn = document.getElementById("new-game-btn");
  const checkBtn = document.getElementById("check-btn");
  const memoToggleBtn = document.getElementById("memo-toggle-btn");
  const eraseBtn = document.getElementById("erase-btn");
  const difficultySelect = document.getElementById("difficulty");
  const messageArea = document.getElementById("message-area");
  const timerElement = document.getElementById("timer");

  // ゲームの状態を管理する変数
  let board = [];
  let solution = [];
  let selectedCell = null;
  let isMemoMode = false;
  let timerInterval = null;
  let elapsedSeconds = 0;
  let messageTimeout = null;

  const difficulties = {
    easy: 35,
    medium: 45,
    hard: 55,
  };

  function newGame() {
    solution = generateSolution(
      Array(9)
        .fill(0)
        .map(() => Array(9).fill(0))
    );
    const difficulty = difficultySelect.value;
    board = generatePuzzle(solution, difficulties[difficulty]);
    drawBoard();
    clearMessage();
    startTimer();
  }

  function startTimer() {
    clearInterval(timerInterval);
    elapsedSeconds = 0;
    timerElement.textContent = "00:00:00";

    timerInterval = setInterval(() => {
      elapsedSeconds++;
      const hours = Math.floor(elapsedSeconds / 3600)
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((elapsedSeconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (elapsedSeconds % 60).toString().padStart(2, "0");
      timerElement.textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);
  }

  function drawBoard() {
    boardElement.innerHTML = "";
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = row;
        cell.dataset.col = col;

        const mainNumberSpan = document.createElement("span");
        mainNumberSpan.classList.add("main-number");

        if (board[row][col] !== 0) {
          mainNumberSpan.textContent = board[row][col];
          cell.classList.add("prefilled");
        } else {
          cell.addEventListener("click", () => selectCell(cell));
          const memoGrid = document.createElement("div");
          memoGrid.classList.add("memo-grid");
          cell.appendChild(memoGrid);
        }

        cell.appendChild(mainNumberSpan);
        boardElement.appendChild(cell);
      }
    }
  }

  function selectCell(cell) {
    if (selectedCell) {
      selectedCell.classList.remove("selected");
    }
    selectedCell = cell;
    selectedCell.classList.add("selected");
  }

  function handleInput(num) {
    if (!selectedCell || selectedCell.classList.contains("prefilled")) return;

    const mainNumberSpan = selectedCell.querySelector(".main-number");

    if (isMemoMode) {
      mainNumberSpan.textContent = "";
      const memoGrid = selectedCell.querySelector(".memo-grid");
      const existingMemos = Array.from(memoGrid.children);
      const existingMemo = existingMemos.find(
        (m) => m.textContent === num.toString()
      );

      if (existingMemo) {
        existingMemo.remove();
      } else {
        const newMemoCell = document.createElement("div");
        newMemoCell.classList.add("memo-cell");
        newMemoCell.textContent = num;
        memoGrid.appendChild(newMemoCell);
      }

      const updatedMemos = Array.from(memoGrid.children);
      updatedMemos.sort(
        (a, b) => parseInt(a.textContent) - parseInt(b.textContent)
      );
      updatedMemos.forEach((m) => memoGrid.appendChild(m));
    } else {
      mainNumberSpan.textContent = num;
      selectedCell.querySelector(".memo-grid").innerHTML = "";
      checkWinCondition();
    }
    updateMemoFontSize(selectedCell);
  }

  function eraseCell() {
    if (selectedCell && !selectedCell.classList.contains("prefilled")) {
      selectedCell.querySelector(".main-number").textContent = "";
      selectedCell.querySelector(".memo-grid").innerHTML = "";
      updateMemoFontSize(selectedCell);
    }
  }

  function updateMemoFontSize(cell) {
    if (!cell || cell.classList.contains("prefilled")) return;

    const memoGrid = cell.querySelector(".memo-grid");
    if (!memoGrid) return;

    const memoCount = memoGrid.children.length;

    memoGrid.classList.remove(
      "memo-xlarge",
      "memo-large",
      "memo-medium",
      "memo-small"
    );

    if (memoCount === 1) {
      memoGrid.classList.add("memo-xlarge");
    } else if (memoCount === 2) {
      memoGrid.classList.add("memo-large");
    } else if (memoCount >= 3 && memoCount <= 4) {
      memoGrid.classList.add("memo-medium");
    } else if (memoCount >= 5) {
      memoGrid.classList.add("memo-small");
    }
  }

  for (let i = 1; i <= 9; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.add("num-btn");
    btn.addEventListener("click", () => handleInput(i));
    numberPalette.appendChild(btn);
  }

  function checkSelectedCell() {
    if (!selectedCell) {
      displayMessage("マスを選択してください。", "orange");
      return;
    }
    if (selectedCell.classList.contains("prefilled")) {
      displayMessage("ここは初めからある数字です。", "orange");
      return;
    }

    const mainValue = selectedCell.querySelector(".main-number").textContent;
    const hasMemos =
      selectedCell.querySelector(".memo-grid").children.length > 0;

    if (mainValue === "" && hasMemos) {
      displayMessage("メモはチェックの対象外です。", "orange");
      return;
    }
    if (mainValue === "") {
      displayMessage("数字が入力されていません。", "orange");
      return;
    }

    const row = selectedCell.dataset.row;
    const col = selectedCell.dataset.col;
    const userValue = parseInt(mainValue);

    if (userValue === solution[row][col]) {
      displayMessage("正解です！", "green");
    } else {
      displayMessage("間違いです。", "red");
    }
  }

  function checkWinCondition() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cell = boardElement.querySelector(
          `[data-row='${row}'][data-col='${col}']`
        );
        const cellValue = cell.querySelector(".main-number").textContent
          ? parseInt(cell.querySelector(".main-number").textContent)
          : 0;
        if (cellValue === 0 || cellValue !== solution[row][col]) {
          return;
        }
      }
    }

    displayMessage("クリア！おめでとう！", "blue", false);
    clearInterval(timerInterval);
  }

  function displayMessage(text, color, autoClear = true) {
    clearTimeout(messageTimeout);
    messageArea.textContent = text;
    messageArea.style.color = color;
    if (autoClear) {
      messageTimeout = setTimeout(clearMessage, 3000);
    }
  }

  function clearMessage() {
    messageArea.textContent = "";
  }

  // --- イベントリスナー ---
  newGameBtn.addEventListener("click", newGame);
  checkBtn.addEventListener("click", checkSelectedCell);
  memoToggleBtn.addEventListener("click", () => {
    isMemoMode = !isMemoMode;
    memoToggleBtn.classList.toggle("active", isMemoMode);
  });
  eraseBtn.addEventListener("click", eraseCell);

  document.addEventListener("keydown", (e) => {
    if (e.key >= "1" && e.key <= "9") {
      handleInput(parseInt(e.key));
    }
  });

  function generateSolution(grid) {
    const emptySpot = findEmpty(grid);
    if (!emptySpot) return grid;
    const [row, col] = emptySpot;
    const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (let num of nums) {
      if (isValid(grid, row, col, num)) {
        grid[row][col] = num;
        if (generateSolution(grid)) return grid;
        grid[row][col] = 0;
      }
    }
    return false;
  }
  function generatePuzzle(fullBoard, holes) {
    let puzzle = fullBoard.map((row) => [...row]);
    let attempts = holes;
    while (attempts > 0) {
      let row = Math.floor(Math.random() * 9);
      let col = Math.floor(Math.random() * 9);
      if (puzzle[row][col] !== 0) {
        puzzle[row][col] = 0;
        attempts--;
      }
    }
    return puzzle;
  }
  function findEmpty(grid) {
    for (let r = 0; r < 9; r++)
      for (let c = 0; c < 9; c++) if (grid[r][c] === 0) return [r, c];
    return null;
  }
  function isValid(grid, row, col, num) {
    for (let i = 0; i < 9; i++) if (grid[row][i] === num) return false;
    for (let i = 0; i < 9; i++) if (grid[i][col] === num) return false;
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 3; c++)
        if (grid[boxRow + r][boxCol + c] === num) return false;
    return true;
  }
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // ▼▼▼ 変更点: ページ読み込み時にゲームを開始する ▼▼▼
  newGame();
});
