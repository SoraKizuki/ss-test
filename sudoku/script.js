// ========================================
// 定数定義
// ========================================
const GAME_MODES = {
  "6x6": {
    gridSize: 6,
    subgridRows: 2,
    subgridCols: 3,
    difficulties: { easy: 10, medium: 15, hard: 20 },
  },
  "9x9": {
    gridSize: 9,
    subgridRows: 3,
    subgridCols: 3,
    difficulties: { easy: 35, medium: 45, hard: 55 },
  },
};

const MESSAGE_COLORS = {
  success: "green",
  error: "red",
  warning: "orange",
  info: "blue",
};

const MESSAGE_DURATION = 3000;

// ========================================
// ユーティリティ関数
// ========================================
class ArrayUtils {
  static shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  static create2DArray(rows, cols, value = 0) {
    return Array(rows)
      .fill(0)
      .map(() => Array(cols).fill(value));
  }
}

// ========================================
// タイマー管理
// ========================================
class Timer {
  constructor(element) {
    this.element = element;
    this.interval = null;
    this.elapsedSeconds = 0;
  }

  start() {
    this.stop();
    this.elapsedSeconds = 0;
    this.update();
    this.interval = setInterval(() => {
      this.elapsedSeconds++;
      this.update();
    }, 1000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  update() {
    const hours = Math.floor(this.elapsedSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((this.elapsedSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (this.elapsedSeconds % 60).toString().padStart(2, "0");
    this.element.textContent = `${hours}:${minutes}:${seconds}`;
  }
}

// ========================================
// メッセージ表示
// ========================================
class MessageDisplay {
  constructor(element) {
    this.element = element;
    this.timeout = null;
  }

  show(text, color, autoClear = true) {
    this.clear();
    this.element.textContent = text;
    this.element.style.color = color;
    if (autoClear) {
      this.timeout = setTimeout(() => this.clear(), MESSAGE_DURATION);
    }
  }

  clear() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.element.textContent = "";
  }
}

// ========================================
// Sudokuソルバー
// ========================================
class SudokuSolver {
  constructor(gridSize, subgridRows, subgridCols) {
    this.gridSize = gridSize;
    this.subgridRows = subgridRows;
    this.subgridCols = subgridCols;
  }

  findEmpty(grid) {
    for (let r = 0; r < this.gridSize; r++) {
      for (let c = 0; c < this.gridSize; c++) {
        if (grid[r][c] === 0) return [r, c];
      }
    }
    return null;
  }

  isValid(grid, row, col, num) {
    // 行と列のチェック
    for (let i = 0; i < this.gridSize; i++) {
      if (grid[row][i] === num || grid[i][col] === num) return false;
    }

    // ブロックのチェック
    const boxRowStart = Math.floor(row / this.subgridRows) * this.subgridRows;
    const boxColStart = Math.floor(col / this.subgridCols) * this.subgridCols;
    for (let r = 0; r < this.subgridRows; r++) {
      for (let c = 0; c < this.subgridCols; c++) {
        if (grid[boxRowStart + r][boxColStart + c] === num) return false;
      }
    }
    return true;
  }

  generateSolution(grid) {
    const emptySpot = this.findEmpty(grid);
    if (!emptySpot) return grid;

    const [row, col] = emptySpot;
    const nums = ArrayUtils.shuffle(
      Array.from({ length: this.gridSize }, (_, i) => i + 1)
    );

    for (let num of nums) {
      if (this.isValid(grid, row, col, num)) {
        grid[row][col] = num;
        if (this.generateSolution(grid)) return grid;
        grid[row][col] = 0;
      }
    }
    return false;
  }

  countSolutions(grid, limit = 2) {
    const empty = this.findEmpty(grid);
    if (!empty) return 1;

    const [row, col] = empty;
    let count = 0;

    for (let num = 1; num <= this.gridSize; num++) {
      if (this.isValid(grid, row, col, num)) {
        grid[row][col] = num;
        count += this.countSolutions(grid, limit);
        grid[row][col] = 0;
        if (count >= limit) return count;
      }
    }
    return count;
  }
}

// ========================================
// パズル生成
// ========================================
class PuzzleGenerator {
  constructor(solver) {
    this.solver = solver;
  }

  generate(solution, holes) {
    const puzzle = solution.map((row) => [...row]);
    const cells = this.getAllCellPositions();
    const shuffledCells = ArrayUtils.shuffle(cells);

    let removed = 0;
    for (let i = 0; i < shuffledCells.length && removed < holes; i++) {
      const [r, c] = shuffledCells[i];
      if (puzzle[r][c] === 0) continue;

      const backup = puzzle[r][c];
      puzzle[r][c] = 0;

      const copy = puzzle.map((row) => [...row]);
      if (this.solver.countSolutions(copy, 2) === 1) {
        removed++;
      } else {
        puzzle[r][c] = backup;
      }
    }
    return puzzle;
  }

  getAllCellPositions() {
    const cells = [];
    for (let r = 0; r < this.solver.gridSize; r++) {
      for (let c = 0; c < this.solver.gridSize; c++) {
        cells.push([r, c]);
      }
    }
    return cells;
  }
}

// ========================================
// セル管理
// ========================================
class CellManager {
  constructor(gridSize) {
    this.gridSize = gridSize;
  }

  createCell(row, col, value, isPrefilled) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.row = row;
    cell.dataset.col = col;

    const mainNumberSpan = document.createElement("span");
    mainNumberSpan.classList.add("main-number");

    if (isPrefilled) {
      mainNumberSpan.textContent = value;
      cell.classList.add("prefilled");
    } else {
      const memoGrid = document.createElement("div");
      memoGrid.classList.add("memo-grid");
      cell.appendChild(memoGrid);
    }

    cell.appendChild(mainNumberSpan);
    return cell;
  }

  updateMemoFontSize(cell) {
    if (!cell || cell.classList.contains("prefilled")) return;

    const memoGrid = cell.querySelector(".memo-grid");
    if (!memoGrid) return;

    const memoCount = memoGrid.children.length;
    memoGrid.className = "memo-grid";

    if (memoCount === 1) memoGrid.classList.add("memo-xlarge");
    else if (memoCount === 2) memoGrid.classList.add("memo-large");
    else if (memoCount >= 3 && memoCount <= 4)
      memoGrid.classList.add("memo-medium");
    else if (memoCount >= 5) memoGrid.classList.add("memo-small");
  }

  toggleMemo(cell, num) {
    const memoGrid = cell.querySelector(".memo-grid");
    const existingMemo = Array.from(memoGrid.children).find(
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

    this.sortMemos(memoGrid);
    this.updateMemoFontSize(cell);
  }

  sortMemos(memoGrid) {
    const memos = Array.from(memoGrid.children);
    memos.sort((a, b) => parseInt(a.textContent) - parseInt(b.textContent));
    memos.forEach((m) => memoGrid.appendChild(m));
  }

  setMainNumber(cell, num) {
    const mainNumberSpan = cell.querySelector(".main-number");
    mainNumberSpan.textContent = num;
    cell.querySelector(".memo-grid").innerHTML = "";
    this.updateMemoFontSize(cell);
  }

  clearCell(cell) {
    cell.querySelector(".main-number").textContent = "";
    cell.querySelector(".memo-grid").innerHTML = "";
    this.updateMemoFontSize(cell);
  }
}

// ========================================
// ゲーム状態管理
// ========================================
class GameState {
  constructor() {
    this.board = [];
    this.solution = [];
    this.selectedCell = null;
    this.isMemoMode = false;
    this.selectedSize = null;
    this.selectedDifficulty = null;
    this.gridSize = 0;
    this.subgridRows = 0;
    this.subgridCols = 0;
  }

  setGameMode(size, difficulty) {
    this.selectedSize = size;
    this.selectedDifficulty = difficulty;
    const settings = GAME_MODES[size];
    this.gridSize = settings.gridSize;
    this.subgridRows = settings.subgridRows;
    this.subgridCols = settings.subgridCols;
  }

  selectCell(cell) {
    if (this.selectedCell) {
      this.selectedCell.classList.remove("selected");
    }
    this.selectedCell = cell;
    if (cell) {
      cell.classList.add("selected");
    }
  }

  toggleMemoMode() {
    this.isMemoMode = !this.isMemoMode;
    return this.isMemoMode;
  }

  checkWinCondition(boardElement) {
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        const cell = boardElement.querySelector(
          `[data-row='${row}'][data-col='${col}']`
        );
        const cellValue = cell.querySelector(".main-number").textContent
          ? parseInt(cell.querySelector(".main-number").textContent)
          : 0;
        if (cellValue === 0 || cellValue !== this.solution[row][col]) {
          return false;
        }
      }
    }
    return true;
  }
}

// ========================================
// UI管理
// ========================================
class UIManager {
  constructor(elements) {
    this.elements = elements;
  }

  showStartScreen() {
    this.elements.gameContainer.classList.add("hidden");
    this.elements.startScreen.classList.remove("hidden");
  }

  showGameScreen() {
    this.elements.startScreen.classList.add("hidden");
    this.elements.gameContainer.classList.remove("hidden");
  }

  showModal() {
    this.elements.confirmModal.classList.remove("hidden");
  }

  hideModal() {
    this.elements.confirmModal.classList.add("hidden");
  }

  renderSizeSelection(onSelect) {
    this.elements.selectionContainer.innerHTML = `
      <div class="selection-group">
        <h2>サイズを選んでください</h2>
        <button class="choice-btn" data-size="6x6">6x6</button>
        <button class="choice-btn" data-size="9x9">9x9</button>
      </div>`;

    this.elements.selectionContainer
      .querySelectorAll(".choice-btn")
      .forEach((btn) => {
        btn.addEventListener("click", (e) => onSelect(e.target.dataset.size));
      });
  }

  renderDifficultySelection(onSelect) {
    this.elements.selectionContainer.innerHTML = `
      <div class="selection-group">
        <h2>難易度を選んでください</h2>
        <button class="choice-btn" data-difficulty="easy">かんたん</button>
        <button class="choice-btn" data-difficulty="medium">ふつう</button>
        <button class="choice-btn" data-difficulty="hard">むずかしい</button>
      </div>`;

    this.elements.selectionContainer
      .querySelectorAll(".choice-btn")
      .forEach((btn) => {
        btn.addEventListener("click", (e) =>
          onSelect(e.target.dataset.difficulty)
        );
      });
  }

  renderStartButton(onStart) {
    this.elements.selectionContainer.innerHTML = `
      <div class="selection-group">
        <button id="start-game-btn">ゲームスタート</button>
      </div>`;

    document
      .getElementById("start-game-btn")
      .addEventListener("click", onStart);
  }

  renderBoard(board, gridSize, onCellClick) {
    const cellManager = new CellManager(gridSize);
    this.elements.boardElement.innerHTML = "";
    this.elements.boardElement.className = `size-${gridSize}x${gridSize}`;

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const value = board[row][col];
        const isPrefilled = value !== 0;
        const cell = cellManager.createCell(row, col, value, isPrefilled);

        if (!isPrefilled) {
          cell.addEventListener("click", () => onCellClick(cell));
        }

        this.elements.boardElement.appendChild(cell);
      }
    }
  }

  renderNumberPalette(gridSize, onNumberClick) {
    this.elements.numberPalette.innerHTML = "";
    for (let i = 1; i <= gridSize; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.classList.add("num-btn");
      btn.addEventListener("click", () => onNumberClick(i));
      this.elements.numberPalette.appendChild(btn);
    }
  }

  updateMemoToggleButton(isActive) {
    this.elements.memoToggleBtn.classList.toggle("active", isActive);
  }
}

// ========================================
// ゲームコントローラー
// ========================================
class SudokuGame {
  constructor() {
    this.elements = this.getElements();
    this.state = new GameState();
    this.ui = new UIManager(this.elements);
    this.timer = new Timer(this.elements.timerElement);
    this.messageDisplay = new MessageDisplay(this.elements.messageArea);
    this.cellManager = new CellManager(9);

    this.setupEventListeners();
    this.init();
  }

  getElements() {
    return {
      startScreen: document.getElementById("start-screen"),
      gameContainer: document.getElementById("game-container"),
      selectionContainer: document.getElementById("selection-container"),
      boardElement: document.getElementById("sudoku-board"),
      numberPalette: document.getElementById("number-palette"),
      newGameBtn: document.getElementById("new-game-btn"),
      checkBtn: document.getElementById("check-btn"),
      memoToggleBtn: document.getElementById("memo-toggle-btn"),
      eraseBtn: document.getElementById("erase-btn"),
      messageArea: document.getElementById("message-area"),
      timerElement: document.getElementById("timer"),
      confirmModal: document.getElementById("confirm-modal"),
      confirmYesBtn: document.getElementById("confirm-yes"),
      confirmNoBtn: document.getElementById("confirm-no"),
    };
  }

  setupEventListeners() {
    this.elements.newGameBtn.addEventListener("click", () =>
      this.ui.showModal()
    );
    this.elements.confirmYesBtn.addEventListener("click", () => {
      this.ui.hideModal();
      this.init();
    });
    this.elements.confirmNoBtn.addEventListener("click", () =>
      this.ui.hideModal()
    );
    this.elements.checkBtn.addEventListener("click", () =>
      this.checkSelectedCell()
    );
    this.elements.memoToggleBtn.addEventListener("click", () =>
      this.toggleMemoMode()
    );
    this.elements.eraseBtn.addEventListener("click", () => this.eraseCell());

    document.addEventListener("keydown", (e) => {
      const num = parseInt(e.key);
      if (num >= 1 && num <= this.state.gridSize) {
        this.handleInput(num);
      }
    });
  }

  init() {
    this.timer.stop();
    this.ui.showStartScreen();
    this.showSizeSelection();
  }

  showSizeSelection() {
    this.ui.renderSizeSelection((size) => {
      this.state.selectedSize = size;
      this.showDifficultySelection();
    });
  }

  showDifficultySelection() {
    this.ui.renderDifficultySelection((difficulty) => {
      this.state.selectedDifficulty = difficulty;
      this.showStartButton();
    });
  }

  showStartButton() {
    this.ui.renderStartButton(() => this.startGame());
  }

  startGame() {
    this.state.setGameMode(
      this.state.selectedSize,
      this.state.selectedDifficulty
    );
    this.cellManager = new CellManager(this.state.gridSize);

    const solver = new SudokuSolver(
      this.state.gridSize,
      this.state.subgridRows,
      this.state.subgridCols
    );

    const emptyGrid = ArrayUtils.create2DArray(
      this.state.gridSize,
      this.state.gridSize
    );
    this.state.solution = solver.generateSolution(emptyGrid);

    if (!this.state.solution) {
      alert("問題の生成に失敗しました。設定を変更して再度お試しください。");
      this.init();
      return;
    }

    const generator = new PuzzleGenerator(solver);
    const holes =
      GAME_MODES[this.state.selectedSize].difficulties[
        this.state.selectedDifficulty
      ];
    this.state.board = generator.generate(this.state.solution, holes);

    this.ui.showGameScreen();
    this.ui.renderBoard(this.state.board, this.state.gridSize, (cell) =>
      this.state.selectCell(cell)
    );
    this.ui.renderNumberPalette(this.state.gridSize, (num) =>
      this.handleInput(num)
    );

    this.messageDisplay.clear();
    this.timer.start();
  }

  handleInput(num) {
    if (
      !this.state.selectedCell ||
      this.state.selectedCell.classList.contains("prefilled")
    ) {
      return;
    }

    if (this.state.isMemoMode) {
      this.state.selectedCell.querySelector(".main-number").textContent = "";
      this.cellManager.toggleMemo(this.state.selectedCell, num);
    } else {
      this.cellManager.setMainNumber(this.state.selectedCell, num);
      if (this.state.checkWinCondition(this.elements.boardElement)) {
        this.messageDisplay.show(
          "クリア!おめでとう!",
          MESSAGE_COLORS.info,
          false
        );
        this.timer.stop();
      }
    }
  }

  eraseCell() {
    if (
      this.state.selectedCell &&
      !this.state.selectedCell.classList.contains("prefilled")
    ) {
      this.cellManager.clearCell(this.state.selectedCell);
    }
  }

  toggleMemoMode() {
    const isActive = this.state.toggleMemoMode();
    this.ui.updateMemoToggleButton(isActive);
  }

  checkSelectedCell() {
    if (!this.state.selectedCell) {
      this.messageDisplay.show(
        "マスを選択してください。",
        MESSAGE_COLORS.warning
      );
      return;
    }

    if (this.state.selectedCell.classList.contains("prefilled")) {
      this.messageDisplay.show(
        "ここは初めからある数字です。",
        MESSAGE_COLORS.warning
      );
      return;
    }

    const mainValue =
      this.state.selectedCell.querySelector(".main-number").textContent;
    if (mainValue === "") {
      this.messageDisplay.show(
        "数字が入力されていません。",
        MESSAGE_COLORS.warning
      );
      return;
    }

    const row = parseInt(this.state.selectedCell.dataset.row);
    const col = parseInt(this.state.selectedCell.dataset.col);
    const userValue = parseInt(mainValue);

    if (userValue === this.state.solution[row][col]) {
      this.messageDisplay.show("正解です!", MESSAGE_COLORS.success);
    } else {
      this.messageDisplay.show("間違いです。", MESSAGE_COLORS.error);
    }
  }
}

// ========================================
// アプリケーション起動
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  new SudokuGame();
});
