// =======================
// 定数
// =======================
const CONFIG = {
  BOARD_SIZE: 8,
  SPECIAL_UNLOCK_TURN: 10,
  CORNER_BONUS: 100,
  FLIP_DURATION: 400,
  CPU_THINK_TIME: 800,
  TURN_DELAY: 500,
  MAX_CPU_THINK_TIME: 60000,
  MAX_RECURSION_DEPTH: 20,
  CUTIN_DURATION: 1200,
  GLOW_DURATION: 1000,
};

const DIFFICULTY_DEPTHS = {
  easy: 1,
  normal: 3,
  hard: 5,
};

const DIRECTIONS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];

const CORNERS = [
  [0, 0],
  [0, 7],
  [7, 0],
  [7, 7],
];

const PLAYERS = {
  GREEN: "green",
  WHITE: "white",
};

// =======================
// ゲーム状態
// =======================
const gameState = {
  board: [],
  currentPlayer: PLAYERS.GREEN,
  playerTurns: 0,
  usedSpecial: false,
  whitePlayerUsedSpecial: false,
  extraTurn: false,
  isAnimating: false,
  cpuDifficulty: "easy",
  specialGlowDone: false,
  gameMode: null,
  playerColor: PLAYERS.GREEN,
};

// =======================
// DOM要素
// =======================
const DOM = {
  startScreen: document.getElementById("startScreen"),
  gameScreen: document.getElementById("gameScreen"),
  modeSelection: document.getElementById("modeSelection"),
  singlePlayerBtn: document.getElementById("singlePlayerBtn"),
  twoPlayerBtn: document.getElementById("twoPlayerBtn"),
  cpuDifficultySelection: document.getElementById("cpuDifficultySelection"),
  turnOrderSelection: document.getElementById("turnOrderSelection"),
  startGameBtn: document.getElementById("startGameBtn"),
  firstMoveBtn: document.getElementById("firstMoveBtn"),
  secondMoveBtn: document.getElementById("secondMoveBtn"),
  board: document.getElementById("board"),
  turn: document.getElementById("turn"),
  score: document.getElementById("score"),
  specialButton: document.getElementById("specialButton"),
  resetButton: document.getElementById("resetButton"),
  resetConfirm: document.getElementById("resetConfirm"),
  confirmYes: document.getElementById("confirmYes"),
  confirmNo: document.getElementById("confirmNo"),
  gameOver: document.getElementById("gameOver"),
  gameOverText: document.getElementById("gameOverText"),
  restartButton: document.getElementById("restartButton"),
  hintToggle: document.getElementById("hintToggle"),
};

// =======================
// ユーティリティ関数
// =======================
const Utils = {
  getOpponent(player) {
    return player === PLAYERS.GREEN ? PLAYERS.WHITE : PLAYERS.GREEN;
  },

  getPlayerLabel(player) {
    return player === PLAYERS.GREEN ? "緑" : "白";
  },

  getPlayerEmoji(player) {
    return player === PLAYERS.GREEN ? "🟢" : "⚪️";
  },

  isInBounds(r, c) {
    return r >= 0 && r < CONFIG.BOARD_SIZE && c >= 0 && c < CONFIG.BOARD_SIZE;
  },

  setCursorWait(isWait) {
    document.body.classList.toggle("waiting", isWait);
  },

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};

// =======================
// ボード管理
// =======================
const BoardManager = {
  createEmptyBoard() {
    return Array(CONFIG.BOARD_SIZE)
      .fill(0)
      .map(() => Array(CONFIG.BOARD_SIZE).fill(null));
  },

  initializeBoard() {
    const board = this.createEmptyBoard();
    board[3][3] = PLAYERS.WHITE;
    board[3][4] = PLAYERS.GREEN;
    board[4][3] = PLAYERS.GREEN;
    board[4][4] = PLAYERS.WHITE;
    return board;
  },

  copyBoard(board) {
    return board.map((row) => [...row]);
  },

  calculateScore(board) {
    let green = 0,
      white = 0;
    board.forEach((row) =>
      row.forEach((piece) => {
        if (piece === PLAYERS.GREEN) green++;
        else if (piece === PLAYERS.WHITE) white++;
      })
    );
    return { green, white };
  },

  applyMove(board, r, c, flippable, player) {
    const newBoard = this.copyBoard(board);
    newBoard[r][c] = player;
    flippable.forEach(({ r: fr, c: fc }) => {
      newBoard[fr][fc] = player;
    });
    return newBoard;
  },
};

// =======================
// 移動ロジック
// =======================
const MoveLogic = {
  getFlippablePieces(board, r, c, player) {
    const opponent = Utils.getOpponent(player);
    const flippable = [];

    for (const [dr, dc] of DIRECTIONS) {
      const directionFlippable = [];
      let currentRow = r + dr;
      let currentCol = c + dc;
      let foundOpponent = false;

      while (Utils.isInBounds(currentRow, currentCol)) {
        const piece = board[currentRow][currentCol];

        if (piece === opponent) {
          directionFlippable.push({ r: currentRow, c: currentCol });
          foundOpponent = true;
        } else if (piece === player) {
          if (foundOpponent) {
            flippable.push(...directionFlippable);
          }
          break;
        } else {
          break;
        }

        currentRow += dr;
        currentCol += dc;
      }
    }

    return flippable;
  },

  getValidMoves(board, player) {
    const moves = [];
    for (let r = 0; r < CONFIG.BOARD_SIZE; r++) {
      for (let c = 0; c < CONFIG.BOARD_SIZE; c++) {
        if (board[r][c] === null) {
          const flipped = this.getFlippablePieces(board, r, c, player);
          if (flipped.length > 0) {
            moves.push({ r, c, flipped });
          }
        }
      }
    }
    return moves;
  },

  evaluateBoard(board, player) {
    const opponent = Utils.getOpponent(player);
    const score = BoardManager.calculateScore(board);
    let value = score[player] - score[opponent];

    // 角のボーナス
    CORNERS.forEach(([r, c]) => {
      if (board[r][c] === player) value += CONFIG.CORNER_BONUS;
      else if (board[r][c] === opponent) value -= CONFIG.CORNER_BONUS;
    });

    // モビリティ評価
    const playerMoves = this.getValidMoves(board, player).length;
    const opponentMoves = this.getValidMoves(board, opponent).length;
    value += (playerMoves - opponentMoves) * 5;

    return value;
  },
};

// =======================
// UI管理
// =======================
const UIManager = {
  renderBoard() {
    DOM.board.innerHTML = "";
    for (let r = 0; r < CONFIG.BOARD_SIZE; r++) {
      const row = DOM.board.insertRow(r);
      for (let c = 0; c < CONFIG.BOARD_SIZE; c++) {
        const cell = row.insertCell(c);
        cell.dataset.row = r;
        cell.dataset.col = c;
        const piece = gameState.board[r][c];
        if (piece) {
          this.createPieceElement(cell, piece);
        }
      }
    }
  },

  createPieceElement(cell, color, isNew = false) {
    const pieceEl = document.createElement("div");
    pieceEl.classList.add("piece", color);
    if (isNew) {
      pieceEl.classList.add("piece-appear");
    }
    cell.appendChild(pieceEl);
  },

  async animateFlip(r, c, newColor) {
    const cell = DOM.board.rows[r].cells[c];
    const pieceEl = cell.querySelector(".piece");
    if (!pieceEl) return;

    return new Promise((resolve) => {
      pieceEl.classList.add("piece-flip");
      setTimeout(() => {
        pieceEl.classList.remove(PLAYERS.GREEN, PLAYERS.WHITE);
        pieceEl.classList.add(newColor);
        pieceEl.classList.remove("piece-flip");
        resolve();
      }, CONFIG.FLIP_DURATION);
    });
  },

  highlightValidMoves(moves) {
    document
      .querySelectorAll("td")
      .forEach((cell) => cell.classList.remove("valid-move"));

    if (DOM.hintToggle && !DOM.hintToggle.classList.contains("active")) {
      return;
    }

    moves.forEach((move) => {
      const cell = DOM.board.rows[move.r].cells[move.c];
      cell.classList.add("valid-move");
    });
  },

  updateScore() {
    const score = BoardManager.calculateScore(gameState.board);
    DOM.score.textContent = `緑:${score.green} 白:${score.white}`;
  },

  updateTurnMessage() {
    let message = "";

    if (gameState.gameMode === "single") {
      if (gameState.currentPlayer === gameState.playerColor) {
        message = "あなたのターン";
      } else {
        message = "🤖 CPUのターン";
      }
    } else {
      const label = Utils.getPlayerLabel(gameState.currentPlayer);
      const emoji = Utils.getPlayerEmoji(gameState.currentPlayer);
      message = `${emoji} ${label}の番`;
    }

    if (DOM.turn) {
      DOM.turn.textContent = message;
    }
  },

  updateSpecialButton() {
    const isCpuTurn =
      gameState.gameMode === "single" &&
      gameState.currentPlayer !== gameState.playerColor;

    if (isCpuTurn) {
      DOM.specialButton.disabled = true;
      this.clearSpecialButtonGlow();
      return;
    }

    const usedFlag =
      gameState.currentPlayer === PLAYERS.GREEN
        ? gameState.usedSpecial
        : gameState.whitePlayerUsedSpecial;

    if (usedFlag) {
      DOM.specialButton.classList.add("used");
      DOM.specialButton.disabled = true;
    } else {
      DOM.specialButton.classList.remove("used");
      DOM.specialButton.disabled =
        gameState.playerTurns < CONFIG.SPECIAL_UNLOCK_TURN;

      if (gameState.playerTurns >= CONFIG.SPECIAL_UNLOCK_TURN) {
        this.glowSpecialButton();
      } else {
        this.clearSpecialButtonGlow();
      }
    }

    DOM.specialButton.textContent = gameState.extraTurn ? "再行動!" : "必殺";
  },

  glowSpecialButton() {
    const used =
      gameState.currentPlayer === PLAYERS.GREEN
        ? gameState.usedSpecial
        : gameState.whitePlayerUsedSpecial;

    if (!used && !DOM.specialButton.classList.contains("active")) {
      DOM.specialButton.classList.add("active");

      if (!gameState.specialGlowDone) {
        DOM.specialButton.classList.add("glow-once");
        gameState.specialGlowDone = true;
        setTimeout(
          () => DOM.specialButton.classList.remove("glow-once"),
          CONFIG.GLOW_DURATION
        );
      }
    }
  },

  clearSpecialButtonGlow() {
    DOM.specialButton.classList.remove("active", "glow-once");
    gameState.specialGlowDone = false;
  },

  updateStatus() {
    this.updateScore();
    this.updateSpecialButton();
  },

  async showCutIn(message) {
    return new Promise((resolve) => {
      const overlay = document.createElement("div");
      overlay.classList.add("cutin-overlay");
      const text = document.createElement("div");
      text.classList.add("cutin-text");
      text.textContent = message;
      overlay.appendChild(text);
      document.body.appendChild(overlay);

      setTimeout(() => {
        overlay.remove();
        resolve();
      }, CONFIG.CUTIN_DURATION);
    });
  },

  showGameOver(result) {
    DOM.gameOverText.textContent = result;
    DOM.gameOver.style.display = "flex";
  },
};

// =======================
// ゲームフロー
// =======================
const GameFlow = {
  async handlePlayerMove(r, c) {
    const validMoves = MoveLogic.getValidMoves(
      gameState.board,
      gameState.currentPlayer
    );
    const move = validMoves.find((m) => m.r === r && m.c === c);

    if (!move) return;

    Utils.setCursorWait(true);
    gameState.isAnimating = true;

    try {
      const cell = DOM.board.rows[r].cells[c];
      gameState.board[r][c] = gameState.currentPlayer;
      UIManager.createPieceElement(cell, gameState.currentPlayer, true);

      const flipPromises = move.flipped.map(({ r: fr, c: fc }) =>
        UIManager.animateFlip(fr, fc, gameState.currentPlayer)
      );
      await Promise.all(flipPromises);

      move.flipped.forEach(({ r: fr, c: fc }) => {
        gameState.board[fr][fc] = gameState.currentPlayer;
      });

      gameState.playerTurns++;
      await this.nextTurn();
    } finally {
      gameState.isAnimating = false;
      Utils.setCursorWait(false);
    }
  },

  async nextTurn() {
    if (gameState.extraTurn) {
      gameState.extraTurn = false;
      const validMovesCurrent = MoveLogic.getValidMoves(
        gameState.board,
        gameState.currentPlayer
      );

      if (validMovesCurrent.length > 0) {
        UIManager.updateStatus();
        UIManager.updateTurnMessage();
        UIManager.highlightValidMoves(validMovesCurrent);

        if (this.isCpuTurn()) {
          setTimeout(() => CPUPlayer.takeTurn(), CONFIG.TURN_DELAY);
        }
        return;
      }
    }

    const opponent = Utils.getOpponent(gameState.currentPlayer);
    const validMovesOpponent = MoveLogic.getValidMoves(
      gameState.board,
      opponent
    );

    if (validMovesOpponent.length > 0) {
      gameState.currentPlayer = opponent;
      UIManager.updateStatus();
      UIManager.updateTurnMessage();
      UIManager.highlightValidMoves(validMovesOpponent);

      if (this.isCpuTurn()) {
        setTimeout(() => CPUPlayer.takeTurn(), CONFIG.TURN_DELAY);
      }
      return;
    }

    const validMovesCurrent = MoveLogic.getValidMoves(
      gameState.board,
      gameState.currentPlayer
    );

    if (validMovesCurrent.length > 0) {
      await UIManager.showCutIn(`${Utils.getPlayerLabel(opponent)}はパス!`);
      UIManager.updateStatus();
      UIManager.updateTurnMessage();
      UIManager.highlightValidMoves(validMovesCurrent);

      if (this.isCpuTurn()) {
        setTimeout(() => CPUPlayer.takeTurn(), CONFIG.TURN_DELAY);
      }
      return;
    }

    this.endGame();
  },

  isCpuTurn() {
    return (
      gameState.gameMode === "single" &&
      gameState.currentPlayer !== gameState.playerColor
    );
  },

  endGame() {
    UIManager.highlightValidMoves([]);
    if (DOM.turn) {
      DOM.turn.textContent = "ゲーム終了!";
    }

    const score = BoardManager.calculateScore(gameState.board);
    let resultText;

    if (score.green > score.white) {
      resultText = "🟢 緑の勝ち!";
    } else if (score.white > score.green) {
      resultText = "⚪️ 白の勝ち!";
    } else {
      resultText = "引き分け!";
    }

    UIManager.showGameOver(
      `${resultText}\n緑: ${score.green} vs 白: ${score.white}`
    );
  },
};

// =======================
// CPU プレイヤー
// =======================
const CPUPlayer = {
  async takeTurn() {
    UIManager.updateTurnMessage();
    Utils.setCursorWait(true);

    try {
      const cpuColor = Utils.getOpponent(gameState.playerColor);
      const usedFlag =
        cpuColor === PLAYERS.GREEN
          ? gameState.usedSpecial
          : gameState.whitePlayerUsedSpecial;

      if (this.shouldUseSpecial(cpuColor, usedFlag)) {
        await SpecialAttack.execute(true);
        return;
      }

      const validMoves = MoveLogic.getValidMoves(gameState.board, cpuColor);
      if (validMoves.length === 0) {
        await GameFlow.nextTurn();
        return;
      }

      await Utils.sleep(CONFIG.CPU_THINK_TIME);

      const bestMove = this.findBestMove(validMoves, cpuColor);
      await this.executeMove(bestMove, cpuColor);

      gameState.playerTurns++;
      await GameFlow.nextTurn();
    } finally {
      gameState.isAnimating = false;
      Utils.setCursorWait(false);
    }
  },

  shouldUseSpecial(cpuColor, usedFlag) {
    if (
      gameState.cpuDifficulty !== "hard" ||
      usedFlag ||
      gameState.playerTurns < CONFIG.SPECIAL_UNLOCK_TURN
    ) {
      return false;
    }

    const score = BoardManager.calculateScore(gameState.board);
    const cpuScore = score[cpuColor];
    const playerScore = score[Utils.getOpponent(cpuColor)];

    return playerScore > cpuScore;
  },

  findBestMove(validMoves, cpuColor) {
    const depth = DIFFICULTY_DEPTHS[gameState.cpuDifficulty];
    const startTime = Date.now();
    let bestMove = validMoves[0];
    let bestValue = -Infinity;

    for (const move of validMoves) {
      if (Date.now() - startTime > CONFIG.MAX_CPU_THINK_TIME) break;

      const newBoard = BoardManager.applyMove(
        gameState.board,
        move.r,
        move.c,
        move.flipped,
        cpuColor
      );

      const value = this.minimax(
        newBoard,
        depth - 1,
        -Infinity,
        Infinity,
        Utils.getOpponent(cpuColor),
        cpuColor,
        0,
        startTime
      );

      if (value > bestValue) {
        bestValue = value;
        bestMove = move;
      }
    }

    return bestMove;
  },

  minimax(
    board,
    depth,
    alpha,
    beta,
    player,
    maximizingPlayer,
    recursionDepth,
    startTime
  ) {
    if (
      Date.now() - startTime > CONFIG.MAX_CPU_THINK_TIME ||
      recursionDepth > CONFIG.MAX_RECURSION_DEPTH ||
      depth === 0
    ) {
      return MoveLogic.evaluateBoard(board, maximizingPlayer);
    }

    const validMoves = MoveLogic.getValidMoves(board, player);

    if (validMoves.length === 0) {
      const nextPlayer = Utils.getOpponent(player);
      const nextValidMoves = MoveLogic.getValidMoves(board, nextPlayer);

      if (nextValidMoves.length === 0) {
        return MoveLogic.evaluateBoard(board, maximizingPlayer);
      }

      return this.minimax(
        board,
        depth,
        alpha,
        beta,
        nextPlayer,
        maximizingPlayer,
        recursionDepth + 1,
        startTime
      );
    }

    if (player === maximizingPlayer) {
      return this.maximizeScore(
        board,
        validMoves,
        depth,
        alpha,
        beta,
        player,
        maximizingPlayer,
        recursionDepth,
        startTime
      );
    } else {
      return this.minimizeScore(
        board,
        validMoves,
        depth,
        alpha,
        beta,
        player,
        maximizingPlayer,
        recursionDepth,
        startTime
      );
    }
  },

  maximizeScore(
    board,
    validMoves,
    depth,
    alpha,
    beta,
    player,
    maximizingPlayer,
    recursionDepth,
    startTime
  ) {
    let maxEval = -Infinity;

    for (const move of validMoves) {
      if (Date.now() - startTime > CONFIG.MAX_CPU_THINK_TIME) break;

      const newBoard = BoardManager.applyMove(
        board,
        move.r,
        move.c,
        move.flipped,
        player
      );
      const evaluation = this.minimax(
        newBoard,
        depth - 1,
        alpha,
        beta,
        Utils.getOpponent(player),
        maximizingPlayer,
        recursionDepth + 1,
        startTime
      );

      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break;
    }

    return maxEval;
  },

  minimizeScore(
    board,
    validMoves,
    depth,
    alpha,
    beta,
    player,
    maximizingPlayer,
    recursionDepth,
    startTime
  ) {
    let minEval = Infinity;

    for (const move of validMoves) {
      if (Date.now() - startTime > CONFIG.MAX_CPU_THINK_TIME) break;

      const newBoard = BoardManager.applyMove(
        board,
        move.r,
        move.c,
        move.flipped,
        player
      );
      const evaluation = this.minimax(
        newBoard,
        depth - 1,
        alpha,
        beta,
        Utils.getOpponent(player),
        maximizingPlayer,
        recursionDepth + 1,
        startTime
      );

      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) break;
    }

    return minEval;
  },

  async executeMove(move, cpuColor) {
    gameState.isAnimating = true;
    const cell = DOM.board.rows[move.r].cells[move.c];

    gameState.board[move.r][move.c] = cpuColor;
    UIManager.createPieceElement(cell, cpuColor, true);

    const flipPromises = move.flipped.map(({ r, c }) =>
      UIManager.animateFlip(r, c, cpuColor)
    );
    await Promise.all(flipPromises);

    move.flipped.forEach(({ r, c }) => {
      gameState.board[r][c] = cpuColor;
    });
  },
};

// =======================
// 必殺技
// =======================
const SpecialAttack = {
  async execute(isCpu = false) {
    if (gameState.isAnimating) return;

    const player = isCpu
      ? Utils.getOpponent(gameState.playerColor)
      : gameState.currentPlayer;
    const usedFlag =
      player === PLAYERS.GREEN
        ? gameState.usedSpecial
        : gameState.whitePlayerUsedSpecial;

    if (gameState.playerTurns < CONFIG.SPECIAL_UNLOCK_TURN || usedFlag) return;

    gameState.isAnimating = true;

    try {
      await UIManager.showCutIn("必殺!! もう1回!");

      if (player === PLAYERS.GREEN) {
        gameState.usedSpecial = true;
      } else {
        gameState.whitePlayerUsedSpecial = true;
      }

      gameState.extraTurn = true;
      UIManager.updateStatus();
      DOM.specialButton.classList.add("used");
      DOM.specialButton.disabled = true;

      if (isCpu) {
        setTimeout(() => CPUPlayer.takeTurn(), CONFIG.TURN_DELAY);
      }
    } finally {
      gameState.isAnimating = false;
    }
  },
};

// =======================
// ゲーム初期化
// =======================
const GameInitializer = {
  initializeBoardState() {
    gameState.board = BoardManager.initializeBoard();
    gameState.currentPlayer = PLAYERS.GREEN;
    gameState.playerTurns = 0;
    gameState.usedSpecial = false;
    gameState.whitePlayerUsedSpecial = false;
    gameState.specialGlowDone = false;
    gameState.isAnimating = false;
    gameState.extraTurn = false;

    DOM.specialButton.classList.remove("used", "active");
    DOM.specialButton.disabled = true;
    DOM.specialButton.textContent = "必殺!";
  },

  initBoard() {
    this.initializeBoardState();
    UIManager.renderBoard();

    const validMoves = MoveLogic.getValidMoves(
      gameState.board,
      gameState.currentPlayer
    );
    UIManager.highlightValidMoves(validMoves);
    UIManager.updateStatus();
    UIManager.updateTurnMessage();

    if (
      gameState.gameMode === "single" &&
      gameState.playerColor === PLAYERS.WHITE
    ) {
      setTimeout(() => CPUPlayer.takeTurn(), CONFIG.TURN_DELAY);
    }
  },

  showStartScreen() {
    DOM.startScreen.style.display = "flex";
    DOM.gameScreen.style.display = "none";
    DOM.gameOver.style.display = "none";
    DOM.modeSelection.classList.remove("hidden");
    DOM.cpuDifficultySelection.classList.add("hidden");
    DOM.turnOrderSelection.classList.add("hidden");
    DOM.startGameBtn.classList.add("hidden");

    document
      .querySelectorAll(".difficulty-btn, .turn-btn, .mode-btn")
      .forEach((btn) => btn.classList.remove("selected"));

    gameState.gameMode = null;
    gameState.cpuDifficulty = "easy";
    gameState.playerColor = PLAYERS.GREEN;

    if (DOM.hintToggle) {
      DOM.hintToggle.classList.remove("active");
      DOM.hintToggle.setAttribute("aria-pressed", "false");
    }
  },
};

// =======================
// イベントハンドラー
// =======================
const EventHandlers = {
  init() {
    this.setupModeSelection();
    this.setupDifficultySelection();
    this.setupTurnOrderSelection();
    this.setupGameStart();
    this.setupGameControls();
    this.setupResetConfirmation();
  },

  setupModeSelection() {
    DOM.singlePlayerBtn.addEventListener("click", () => {
      gameState.gameMode = "single";
      DOM.modeSelection.classList.add("hidden");
      DOM.cpuDifficultySelection.classList.remove("hidden");
    });

    DOM.twoPlayerBtn.addEventListener("click", () => {
      gameState.gameMode = "two";
      DOM.modeSelection.classList.add("hidden");
      DOM.startGameBtn.classList.remove("hidden");
    });
  },

  setupDifficultySelection() {
    document.querySelectorAll(".difficulty-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        document
          .querySelectorAll(".difficulty-btn")
          .forEach((b) => b.classList.remove("selected"));
        e.target.classList.add("selected");
        gameState.cpuDifficulty = e.target.dataset.difficulty;
        DOM.cpuDifficultySelection.classList.add("hidden");
        DOM.turnOrderSelection.classList.remove("hidden");
      });
    });
  },

  setupTurnOrderSelection() {
    DOM.firstMoveBtn.addEventListener("click", () => {
      gameState.playerColor = PLAYERS.GREEN;
      document
        .querySelectorAll(".turn-btn")
        .forEach((b) => b.classList.remove("selected"));
      DOM.firstMoveBtn.classList.add("selected");
      DOM.turnOrderSelection.classList.add("hidden");
      DOM.startGameBtn.classList.remove("hidden");
    });

    DOM.secondMoveBtn.addEventListener("click", () => {
      gameState.playerColor = PLAYERS.WHITE;
      document
        .querySelectorAll(".turn-btn")
        .forEach((b) => b.classList.remove("selected"));
      DOM.secondMoveBtn.classList.add("selected");
      DOM.turnOrderSelection.classList.add("hidden");
      DOM.startGameBtn.classList.remove("hidden");
    });
  },

  setupGameStart() {
    DOM.startGameBtn.addEventListener("click", () => {
      const isSinglePlayerReady =
        gameState.gameMode === "single" &&
        document.querySelector(".difficulty-btn.selected") &&
        document.querySelector(".turn-btn.selected");
      const isTwoPlayerReady = gameState.gameMode === "two";

      if (isSinglePlayerReady || isTwoPlayerReady) {
        DOM.startScreen.style.display = "none";
        DOM.gameScreen.style.display = "block";
        GameInitializer.initBoard();
      }
    });
  },

  setupGameControls() {
    DOM.board.addEventListener("click", async (event) => {
      if (gameState.isAnimating) return;

      const cell = event.target.closest("td");
      if (!cell) return;

      const r = parseInt(cell.dataset.row);
      const c = parseInt(cell.dataset.col);

      if (GameFlow.isCpuTurn()) return;

      await GameFlow.handlePlayerMove(r, c);
    });

    DOM.specialButton.addEventListener("click", () =>
      SpecialAttack.execute(false)
    );

    if (DOM.hintToggle) {
      DOM.hintToggle.addEventListener("click", () => {
        const isActive = DOM.hintToggle.classList.toggle("active");
        DOM.hintToggle.setAttribute(
          "aria-pressed",
          isActive ? "true" : "false"
        );
        const validMoves = MoveLogic.getValidMoves(
          gameState.board,
          gameState.currentPlayer
        );
        UIManager.highlightValidMoves(validMoves);
      });
    }

    DOM.restartButton.addEventListener("click", () => {
      GameInitializer.showStartScreen();
    });
  },

  setupResetConfirmation() {
    DOM.resetButton.addEventListener("click", () => {
      if (!DOM.resetConfirm) {
        if (confirm("ゲームを最初からやり直しますか？")) {
          GameInitializer.showStartScreen();
        }
        return;
      }
      DOM.resetConfirm.classList.remove("hidden");
    });

    if (DOM.confirmYes) {
      DOM.confirmYes.addEventListener("click", () => {
        DOM.resetConfirm.classList.add("hidden");
        GameInitializer.showStartScreen();
      });
    }

    if (DOM.confirmNo) {
      DOM.confirmNo.addEventListener("click", () => {
        DOM.resetConfirm.classList.add("hidden");
      });
    }
  },
};

// =======================
// アプリケーション起動
// =======================
EventHandlers.init();
GameInitializer.showStartScreen();
