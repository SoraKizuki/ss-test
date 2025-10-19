// =======================
// 定数
// =======================
const BOARD_SIZE = 8;
const SPECIAL_UNLOCK_TURN = 10;
const CORNER_BONUS = 100;
const FLIP_DURATION = 400;
const CPU_THINK_TIME = 800;
const TURN_DELAY = 500;
const MAX_CPU_THINK_TIME = 60000; // 1分

// =======================
// ゲーム状態
// =======================
const gameState = {
  board: [],
  currentPlayer: "green",
  playerTurns: 0,
  usedSpecial: false,
  whitePlayerUsedSpecial: false,
  extraTurn: false,
  isAnimating: false,
  cpuDifficulty: "easy",
  specialGlowDone: false,
  gameMode: null,
  playerColor: "green",
};

// =======================
// DOM要素
// =======================
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const modeSelection = document.getElementById("modeSelection");
const singlePlayerBtn = document.getElementById("singlePlayerBtn");
const twoPlayerBtn = document.getElementById("twoPlayerBtn");
const cpuDifficultySelection = document.getElementById(
  "cpuDifficultySelection"
);
const turnOrderSelection = document.getElementById("turnOrderSelection");
const startGameBtn = document.getElementById("startGameBtn");
const firstMoveBtn = document.getElementById("firstMoveBtn");
const secondMoveBtn = document.getElementById("secondMoveBtn");
const boardElement = document.getElementById("board");
const turnElement = document.getElementById("turn");
const scoreElement = document.getElementById("score");
const specialButton = document.getElementById("specialButton");
const resetButton = document.getElementById("resetButton");
const resetConfirm = document.getElementById("resetConfirm");
const confirmYes = document.getElementById("confirmYes");
const confirmNo = document.getElementById("confirmNo");
const gameOverEl = document.getElementById("gameOver");
const gameOverText = document.getElementById("gameOverText");
const restartButton = document.getElementById("restartButton");
const hintToggle = document.getElementById("hintToggle");

// =======================
// 初期化
// =======================
function initializeBoardState() {
  gameState.board = Array(BOARD_SIZE)
    .fill(0)
    .map(() => Array(BOARD_SIZE).fill(null));
  gameState.board[3][3] = "white";
  gameState.board[3][4] = "green";
  gameState.board[4][3] = "green";
  gameState.board[4][4] = "white";
  gameState.currentPlayer = "green";
  gameState.playerTurns = 0;
  gameState.usedSpecial = false;
  gameState.whitePlayerUsedSpecial = false;
  gameState.specialGlowDone = false;
  gameState.isAnimating = false;
  gameState.extraTurn = false;
  specialButton.classList.remove("used", "active");
  specialButton.disabled = true;
  specialButton.textContent = "必殺！";
}

function initBoard() {
  initializeBoardState();
  renderBoard();
  const validMoves = getValidMoves(gameState.board, gameState.currentPlayer);
  highlightValidMoves(validMoves);
  updateStatus();
  updateTurnMessage();

  if (gameState.gameMode === "single" && gameState.playerColor === "white") {
    setTimeout(() => cpuTurn(), TURN_DELAY);
  }
}

function showStartScreen() {
  startScreen.style.display = "flex";
  gameScreen.style.display = "none";
  gameOverEl.style.display = "none";
  modeSelection.classList.remove("hidden");
  cpuDifficultySelection.classList.add("hidden");
  turnOrderSelection.classList.add("hidden");
  startGameBtn.classList.add("hidden");
  document
    .querySelectorAll(".difficulty-btn, .turn-btn, .mode-btn")
    .forEach((b) => b.classList.remove("selected"));
  gameState.gameMode = null;
  gameState.cpuDifficulty = "easy";
  gameState.playerColor = "green";
  if (hintToggle) {
    hintToggle.classList.remove("active");
    hintToggle.setAttribute("aria-pressed", "false");
  }
}

function initEventHandlers() {
  singlePlayerBtn.addEventListener("click", () => {
    gameState.gameMode = "single";
    modeSelection.classList.add("hidden");
    cpuDifficultySelection.classList.remove("hidden");
  });

  twoPlayerBtn.addEventListener("click", () => {
    gameState.gameMode = "two";
    modeSelection.classList.add("hidden");
    startGameBtn.classList.remove("hidden");
  });

  document.querySelectorAll(".difficulty-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document
        .querySelectorAll(".difficulty-btn")
        .forEach((b) => b.classList.remove("selected"));
      e.target.classList.add("selected");
      gameState.cpuDifficulty = e.target.dataset.difficulty;
      cpuDifficultySelection.classList.add("hidden");
      turnOrderSelection.classList.remove("hidden");
    });
  });

  firstMoveBtn.addEventListener("click", () => {
    gameState.playerColor = "green";
    document
      .querySelectorAll(".turn-btn")
      .forEach((b) => b.classList.remove("selected"));
    firstMoveBtn.classList.add("selected");
    turnOrderSelection.classList.add("hidden");
    startGameBtn.classList.remove("hidden");
  });

  secondMoveBtn.addEventListener("click", () => {
    gameState.playerColor = "white";
    document
      .querySelectorAll(".turn-btn")
      .forEach((b) => b.classList.remove("selected"));
    secondMoveBtn.classList.add("selected");
    turnOrderSelection.classList.add("hidden");
    startGameBtn.classList.remove("hidden");
  });

  startGameBtn.addEventListener("click", () => {
    const isSinglePlayerReady =
      gameState.gameMode === "single" &&
      document.querySelector(".difficulty-btn.selected") &&
      document.querySelector(".turn-btn.selected");
    const isTwoPlayerReady = gameState.gameMode === "two";
    if (isSinglePlayerReady || isTwoPlayerReady) {
      startScreen.style.display = "none";
      gameScreen.style.display = "block";
      initBoard();
    }
  });

  boardElement.addEventListener("click", handleBoardClick);
  specialButton.addEventListener("click", () => handleSpecialAttack(false));
  // ヒント（置ける場所表示）のトグル（ボタンに置換）
  if (hintToggle) {
    hintToggle.addEventListener("click", () => {
      const isActive = hintToggle.classList.toggle("active");
      // アクセシビリティ属性も更新
      hintToggle.setAttribute("aria-pressed", isActive ? "true" : "false");
      const validMoves = getValidMoves(
        gameState.board,
        gameState.currentPlayer
      );
      highlightValidMoves(validMoves);
    });
  }
  // カスタム確認モーダルを表示
  resetButton.addEventListener("click", () => {
    if (!resetConfirm) {
      // フォールバック
      if (confirm("ゲームを最初からやり直しますか？")) showStartScreen();
      return;
    }
    resetConfirm.classList.remove("hidden");
  });

  // モーダルの Yes / No ハンドラ
  if (confirmYes) {
    confirmYes.addEventListener("click", () => {
      resetConfirm.classList.add("hidden");
      showStartScreen();
    });
  }
  if (confirmNo) {
    confirmNo.addEventListener("click", () => {
      resetConfirm.classList.add("hidden");
    });
  }
  restartButton.addEventListener("click", showStartScreen);
}

// ゲームロジック
function renderBoard() {
  boardElement.innerHTML = "";
  for (let r = 0; r < BOARD_SIZE; r++) {
    const row = boardElement.insertRow(r);
    for (let c = 0; c < BOARD_SIZE; c++) {
      const cell = row.insertCell(c);
      cell.dataset.row = r;
      cell.dataset.col = c;
      const piece = gameState.board[r][c];
      if (piece) {
        createPieceElement(cell, piece);
      }
    }
  }
}

function createPieceElement(cell, color, isNew = false) {
  const pieceEl = document.createElement("div");
  pieceEl.classList.add("piece", color);
  if (isNew) {
    pieceEl.classList.add("piece-appear");
  }
  cell.appendChild(pieceEl);
}

function getValidMoves(board, player) {
  const moves = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] === null) {
        const flipped = getFlippablePieces(board, r, c, player);
        if (flipped.length > 0) {
          moves.push({ r, c, flipped });
        }
      }
    }
  }
  return moves;
}

function getFlippablePieces(board, r, c, player) {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];
  const opponent = player === "green" ? "white" : "green";
  const flippable = [];
  for (const [dr, dc] of directions) {
    const directionFlippable = [];
    let currentRow = r + dr,
      currentCol = c + dc,
      foundOpponent = false;
    while (
      currentRow >= 0 &&
      currentRow < BOARD_SIZE &&
      currentCol >= 0 &&
      currentCol < BOARD_SIZE
    ) {
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
}

function applyMove(r, c, flippable, player) {
  const newBoard = gameState.board.map((row) => [...row]);
  newBoard[r][c] = player;
  flippable.forEach(({ r: fr, c: fc }) => {
    newBoard[fr][fc] = player;
  });
  return newBoard;
}

function updateStatus() {
  const score = calculateScore(gameState.board);
  scoreElement.textContent = `緑:${score.green} 白:${score.white}`;

  const isCpuTurn =
    gameState.gameMode === "single" &&
    gameState.currentPlayer !== gameState.playerColor;

  if (isCpuTurn) {
    specialButton.disabled = true;
    clearSpecialButtonGlow();
    return;
  }

  const usedFlag =
    gameState.currentPlayer === "green"
      ? gameState.usedSpecial
      : gameState.whitePlayerUsedSpecial;

  if (usedFlag) {
    specialButton.classList.add("used");
    specialButton.disabled = true;
  } else {
    // このプレイヤーが未使用なら見た目の 'used' を解除して利用可否を評価
    specialButton.classList.remove("used");
    specialButton.disabled = gameState.playerTurns < SPECIAL_UNLOCK_TURN;
    if (gameState.playerTurns >= SPECIAL_UNLOCK_TURN) {
      glowSpecialButton();
    } else {
      clearSpecialButtonGlow();
    }
  }

  specialButton.textContent = gameState.extraTurn ? "再行動!" : "必殺";
}

function updateTurnMessage() {
  let message = "";
  if (
    gameState.gameMode === "single" &&
    gameState.currentPlayer === gameState.playerColor
  ) {
    message = "あなたのターン";
  } else if (
    gameState.gameMode === "single" &&
    gameState.currentPlayer !== gameState.playerColor
  ) {
    message = "🤖 CPUのターン";
  } else {
    const playerLabel = gameState.currentPlayer === "green" ? "緑" : "白";
    const playerEmoji = gameState.currentPlayer === "green" ? "🟢" : "⚪️";
    message = `${playerEmoji} ${playerLabel}の番`;
  }

  if (turnElement) {
    turnElement.textContent = message;
  }
}

function clearSpecialButtonGlow() {
  specialButton.classList.remove("active", "glow-once");
  gameState.specialGlowDone = false;
}

function glowSpecialButton() {
  const used =
    gameState.currentPlayer === "green"
      ? gameState.usedSpecial
      : gameState.whitePlayerUsedSpecial;
  if (!used && !specialButton.classList.contains("active")) {
    specialButton.classList.add("active");
    if (!gameState.specialGlowDone) {
      specialButton.classList.add("glow-once");
      gameState.specialGlowDone = true;
      setTimeout(() => specialButton.classList.remove("glow-once"), 1000);
    }
  }
}

function highlightValidMoves(moves) {
  // まず全てのハイライトをクリア
  document
    .querySelectorAll("td")
    .forEach((cell) => cell.classList.remove("valid-move"));

  // ヒントが無効なら何もしない（ただし内部的には合法手は保持されている）
  if (hintToggle && !hintToggle.classList.contains("active")) return;

  moves.forEach((move) => {
    const cell = boardElement.rows[move.r].cells[move.c];
    cell.classList.add("valid-move");
  });
}

async function handleBoardClick(event) {
  if (gameState.isAnimating) return;
  const cell = event.target.closest("td");
  if (!cell) return;

  const r = parseInt(cell.dataset.row);
  const c = parseInt(cell.dataset.col);

  if (
    gameState.gameMode === "single" &&
    gameState.currentPlayer !== gameState.playerColor
  )
    return;

  // 常に現在の合法手を計算して、クリック位置が合法手かを判定する
  const validMoves = getValidMoves(gameState.board, gameState.currentPlayer);
  const move = validMoves.find((m) => m.r === r && m.c === c);

  if (move) {
    setCursorWait(true);
    gameState.isAnimating = true;

    try {
      gameState.board[r][c] = gameState.currentPlayer;
      createPieceElement(cell, gameState.currentPlayer, true);
      const flipPromises = move.flipped.map(({ r: fr, c: fc }) =>
        animateFlip(fr, fc, gameState.currentPlayer)
      );
      await Promise.all(flipPromises);
      move.flipped.forEach(({ r: fr, c: fc }) => {
        gameState.board[fr][fc] = gameState.currentPlayer;
      });
      gameState.playerTurns++;
      nextTurn();
    } finally {
      gameState.isAnimating = false;
      setCursorWait(false);
    }
  }
}

async function animateFlip(r, c, newColor) {
  const cell = boardElement.rows[r].cells[c];
  const pieceEl = cell.querySelector(".piece");
  if (!pieceEl) return;
  return new Promise((resolve) => {
    pieceEl.classList.add("piece-flip");
    setTimeout(() => {
      pieceEl.classList.remove("green", "white");
      pieceEl.classList.add(newColor);
      pieceEl.classList.remove("piece-flip");
      resolve();
    }, FLIP_DURATION);
  });
}

async function nextTurn() {
  if (gameState.extraTurn) {
    gameState.extraTurn = false;
    const validMovesCurrent = getValidMoves(
      gameState.board,
      gameState.currentPlayer
    );
    if (validMovesCurrent.length > 0) {
      updateStatus();
      updateTurnMessage();
      highlightValidMoves(validMovesCurrent);
      if (
        gameState.gameMode === "single" &&
        gameState.currentPlayer !== gameState.playerColor
      ) {
        setTimeout(() => cpuTurn(), TURN_DELAY);
      }
      return;
    }
  }

  const opponent = gameState.currentPlayer === "green" ? "white" : "green";
  const validMovesOpponent = getValidMoves(gameState.board, opponent);
  if (validMovesOpponent.length > 0) {
    gameState.currentPlayer = opponent;
    updateStatus();
    updateTurnMessage();
    highlightValidMoves(validMovesOpponent);
    if (
      gameState.gameMode === "single" &&
      gameState.currentPlayer !== gameState.playerColor
    ) {
      setTimeout(() => cpuTurn(), TURN_DELAY);
    }
    return;
  }

  const validMovesCurrent = getValidMoves(
    gameState.board,
    gameState.currentPlayer
  );
  if (validMovesCurrent.length > 0) {
    await showPassCutIn(`${opponent === "green" ? "緑" : "白"}はパス!`);
    updateStatus();
    updateTurnMessage();
    highlightValidMoves(validMovesCurrent);
    if (
      gameState.gameMode === "single" &&
      gameState.currentPlayer !== gameState.playerColor
    ) {
      setTimeout(() => cpuTurn(), TURN_DELAY);
    }
    return;
  }
  endGame();
}

function endGame() {
  highlightValidMoves([]);
  if (turnElement) {
    turnElement.textContent = "ゲーム終了!";
  }
  const score = calculateScore(gameState.board);
  let resultText;
  if (score.green > score.white) {
    resultText = "🟢 緑の勝ち!";
  } else if (score.white > score.green) {
    resultText = "⚪️ 白の勝ち!";
  } else {
    resultText = "引き分け!";
  }
  showGameOver(`${resultText}\n緑: ${score.green} vs 白: ${score.white}`);
}

function calculateScore(board) {
  let green = 0,
    white = 0;
  board.forEach((row) =>
    row.forEach((p) => {
      if (p === "green") green++;
      else if (p === "white") white++;
    })
  );
  return { green, white };
}

async function cpuTurn() {
  updateTurnMessage();
  setCursorWait(true);

  try {
    const cpuColor = gameState.playerColor === "green" ? "white" : "green";
    const usedFlag =
      cpuColor === "green"
        ? gameState.usedSpecial
        : gameState.whitePlayerUsedSpecial;

    // CPUが必殺を使えるのは「むずかしい」モードのみ
    if (
      gameState.cpuDifficulty === "hard" &&
      !usedFlag &&
      gameState.playerTurns >= SPECIAL_UNLOCK_TURN
    ) {
      const score = calculateScore(gameState.board);
      const cpuScore = score[cpuColor];
      const playerScore = score[cpuColor === "green" ? "white" : "green"];
      if (playerScore > cpuScore) {
        await handleSpecialAttack(true);
        return;
      }
    }

    const validMoves = getValidMoves(gameState.board, cpuColor);
    if (validMoves.length === 0) {
      nextTurn();
      return;
    }

    let bestMove = validMoves[0];
    let depth;
    switch (gameState.cpuDifficulty) {
      case "easy":
        depth = 1;
        break;
      case "normal":
        depth = 3;
        break;
      case "hard":
        depth = 5;
        break;
    }

    await new Promise((resolve) => setTimeout(resolve, CPU_THINK_TIME));

    const startTime = Date.now();
    let bestValue = -Infinity;

    for (const move of validMoves) {
      if (Date.now() - startTime > MAX_CPU_THINK_TIME) {
        break;
      }

      const newBoard = applyMove(move.r, move.c, move.flipped, cpuColor);
      const value = minimax(
        newBoard,
        depth - 1,
        -Infinity,
        Infinity,
        cpuColor === "green" ? "white" : "green",
        cpuColor,
        0,
        startTime
      );
      if (value > bestValue) {
        bestValue = value;
        bestMove = move;
      }
    }

    gameState.isAnimating = true;
    const cell = boardElement.rows[bestMove.r].cells[bestMove.c];
    gameState.board[bestMove.r][bestMove.c] = cpuColor;
    createPieceElement(cell, cpuColor, true);
    const flipPromises = bestMove.flipped.map(({ r, c }) =>
      animateFlip(r, c, cpuColor)
    );
    await Promise.all(flipPromises);
    bestMove.flipped.forEach(({ r, c }) => {
      gameState.board[r][c] = cpuColor;
    });
    gameState.playerTurns++;
    nextTurn();
  } finally {
    gameState.isAnimating = false;
    setCursorWait(false);
  }
}

function evaluateBoard(board, player) {
  const opponent = player === "green" ? "white" : "green";
  const score = calculateScore(board);
  let value = score[player] - score[opponent];
  const corners = [
    [0, 0],
    [0, 7],
    [7, 0],
    [7, 7],
  ];
  corners.forEach(([r, c]) => {
    if (board[r][c] === player) value += CORNER_BONUS;
    else if (board[r][c] === opponent) value -= CORNER_BONUS;
  });
  const playerMoves = getValidMoves(board, player).length;
  const opponentMoves = getValidMoves(board, opponent).length;
  value += (playerMoves - opponentMoves) * 5;
  return value;
}

function minimax(
  board,
  depth,
  alpha,
  beta,
  player,
  maximizingPlayer,
  recursionDepth = 0,
  startTime = Date.now()
) {
  const MAX_RECURSION_DEPTH = 20;

  if (Date.now() - startTime > MAX_CPU_THINK_TIME) {
    return evaluateBoard(board, maximizingPlayer);
  }

  if (recursionDepth > MAX_RECURSION_DEPTH || depth === 0) {
    return evaluateBoard(board, maximizingPlayer);
  }

  const validMoves = getValidMoves(board, player);
  if (validMoves.length === 0) {
    const nextPlayer = player === "green" ? "white" : "green";
    const nextValidMoves = getValidMoves(board, nextPlayer);
    if (nextValidMoves.length === 0) {
      return evaluateBoard(board, maximizingPlayer);
    } else {
      return minimax(
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
  }

  if (player === maximizingPlayer) {
    let maxEval = -Infinity;
    for (const move of validMoves) {
      if (Date.now() - startTime > MAX_CPU_THINK_TIME) break;

      const newBoard = applyMove(move.r, move.c, move.flipped, player);
      const evaluation = minimax(
        newBoard,
        depth - 1,
        alpha,
        beta,
        player === "green" ? "white" : "green",
        maximizingPlayer,
        recursionDepth + 1,
        startTime
      );
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of validMoves) {
      if (Date.now() - startTime > MAX_CPU_THINK_TIME) break;

      const newBoard = applyMove(move.r, move.c, move.flipped, player);
      const evaluation = minimax(
        newBoard,
        depth - 1,
        alpha,
        beta,
        player === "green" ? "white" : "green",
        maximizingPlayer,
        recursionDepth + 1,
        startTime
      );
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

async function handleSpecialAttack(isCpu = false) {
  if (gameState.isAnimating) return;

  const player = isCpu
    ? gameState.playerColor === "green"
      ? "white"
      : "green"
    : gameState.currentPlayer;
  const usedFlag =
    player === "green"
      ? gameState.usedSpecial
      : gameState.whitePlayerUsedSpecial;

  if (gameState.playerTurns < SPECIAL_UNLOCK_TURN || usedFlag) return;

  gameState.isAnimating = true;

  try {
    await triggerSpecialCutIn("必殺!! もう1回!");

    if (player === "green") {
      gameState.usedSpecial = true;
    } else {
      gameState.whitePlayerUsedSpecial = true;
    }

    // 次の (次回の) ターン移行時に二回目の行動が許されるように
    // フラグをセットする。ここで nextTurn を呼ばず、
    // 実際の手番終了後に nextTurn がフラグを消費する。
    gameState.extraTurn = true;

    updateStatus();
    specialButton.classList.add("used");
    specialButton.disabled = true;

    // CPU が必殺を使った場合は、すぐにもう一手打たせるため少し待ってから cpuTurn を呼ぶ
    if (isCpu) {
      // 次の CPU 思考を開始（遅延で演出）
      setTimeout(() => {
        // CPU の追加ターンを非同期で開始
        cpuTurn();
      }, TURN_DELAY);
    }
  } finally {
    gameState.isAnimating = false;
  }
}

function triggerSpecialCutIn(message) {
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
    }, 1200);
  });
}

function showPassCutIn(message) {
  return triggerSpecialCutIn(message);
}

function setCursorWait(isWait) {
  document.body.classList.toggle("waiting", isWait);
}

function showGameOver(result) {
  gameOverText.textContent = result;
  gameOverEl.style.display = "flex";
}

initEventHandlers();
showStartScreen();
