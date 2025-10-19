import {
  player,
  enemy1,
  enemy2,
  score,
  frame,
  gameoverScreen,
} from "./game.js";

// --- ゲームの状態を管理する変数 ---
let jump = -20;
let currentScore = 0;
let animationFrame = 0;
let backgroundX = 0;
let playerSpriteX = 0;
let isGameOver = false;

// --- レスポンシブ対応のためのゲーム内定数 ---
let groundY;
let playerInitialX;
let playerWidth;
let playerHeight;
let enemyWidth;

function initializeGameConstants() {
  const frameRect = frame.el.getBoundingClientRect();
  groundY = frameRect.height * 0.05;
  playerInitialX = player.el.offsetLeft;
  playerWidth = player.el.offsetWidth;
  playerHeight = player.el.offsetHeight;
  enemyWidth = enemy1.el.offsetWidth;
}

const enemies = [
  { obj: enemy1, timer: 100 },
  { obj: enemy2, timer: 250 },
];

// --- 速度を管理する変数 ---
let gameSpeed = 5;
// ★変更点: 最高・最低速度の範囲を調整
const maxGameSpeed = 20;
const minGameSpeed = 4;
// ★変更点: 速度変更のタイマー初期値を調整
let speedChangeTimer = 90;

// --- 入力処理 ---
addEventListener("keydown", (ev) => {
  if ((ev.key === "ArrowUp" || ev.key === " ") && jump === -20) {
    jump = 19;
  }
});

addEventListener("mousedown", () => {
  if (jump === -20) {
    jump = 19;
  }
});

document.getElementById("restart-button").addEventListener("click", () => {
  location.reload();
});

// --- メインゲームループ ---
let isInitialized = false;

function gameLoop() {
  if (isGameOver) {
    return;
  }

  if (!isInitialized) {
    initializeGameConstants();
    isInitialized = true;
  }

  // ★★★ここからが変更箇所★★★
  // --- 不規則なスピード変更処理 ---
  speedChangeTimer--;
  if (speedChangeTimer <= 0) {
    // 次の速度変更までの時間をランダムに設定 (1秒〜2.5秒)
    speedChangeTimer = Math.random() * 90 + 60;

    // 速度の変更量をランダムに決定 (-1.5 ~ +2.5)
    // 変化の幅を大きくして、より予測しづらくする
    const speedChange = Math.random() * 4 - 1.5;
    gameSpeed += speedChange;

    // 速度が最小値・最大値の範囲に収まるように調整
    if (gameSpeed < minGameSpeed) {
      gameSpeed = minGameSpeed;
    }
    if (gameSpeed > maxGameSpeed) {
      gameSpeed = maxGameSpeed;
    }
  }

  // 背景スクロール
  backgroundX -= gameSpeed;
  frame.pxp = backgroundX;

  // スコア加算
  currentScore += 0.1;
  score.text = "SCORE " + String(~~currentScore).padStart(5, 0);

  // フレームカウンター
  animationFrame++;

  // ジャンプ処理
  if (jump > -20) {
    player.y += jump * (playerHeight / 140);
    jump--;
    player.px = 0;
    player.py = 100;
  } else {
    player.y = groundY;
    player.py = 0;
    // 走るアニメーション
    if (animationFrame % Math.floor(15 - gameSpeed) === 0) {
      playerSpriteX = playerSpriteX === 0 ? 100 : 0;
      player.px = playerSpriteX;
    }
  }

  // エネミーのループ処理
  enemies.forEach((enemy, index) => {
    if (enemy.timer > 0) {
      enemy.timer--;
    }
    if (enemy.timer <= 0) {
      enemy.obj.visible();
      enemy.obj.x -= gameSpeed;
    }

    if (enemy.obj.x <= -enemyWidth) {
      enemy.obj.hide();

      if (index === 0) {
        enemy.timer = Math.random() * 80 + 150;
      } else {
        enemy.timer = Math.random() * 154 + 253;
      }

      enemy.obj.x = frame.el.offsetWidth;
    }

    // 当たり判定
    const playerHitboxXStart = playerInitialX;
    const playerHitboxXEnd = playerInitialX + playerWidth * 0.8;
    const enemyHitboxXStart = enemy.obj.x;
    const enemyHitboxXEnd = enemy.obj.x + enemyWidth;
    const playerHitboxYEnd = groundY + playerHeight * 0.5;
    const isOverlappingX =
      enemyHitboxXStart < playerHitboxXEnd &&
      enemyHitboxXEnd > playerHitboxXStart;
    const isOverlappingY = player.y < playerHitboxYEnd;

    if (isOverlappingX && isOverlappingY) {
      player.px = 100;
      player.py = 100;
      gameoverScreen.visible();
      isGameOver = true;
    }
  });

  requestAnimationFrame(gameLoop);
}

// ゲーム開始
requestAnimationFrame(gameLoop);
