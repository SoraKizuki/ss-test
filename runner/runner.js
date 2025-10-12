import { player, enemy, score, frame, gameoverScreen } from "./game.js";

// --- ゲームの状態を管理する変数 ---
let jump = -20;
let obstacleTimer = 100;
let currentScore = 0;
let animationFrame = 0;
let backgroundX = 0;
let playerSpriteX = 0;

// --- 速度を管理する変数 ---
let gameSpeed = 5;
const gameAcceleration = 0.0036;
const maxGameSpeed = 12;

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
function gameLoop() {
  // スピードアップ処理
  if (gameSpeed < maxGameSpeed) {
    gameSpeed += gameAcceleration;
  }

  // 背景スクロール (障害物と完全に同じ速度)
  backgroundX -= gameSpeed;
  frame.pxp = backgroundX;

  // スコア加算
  currentScore += 0.1;
  score.text = "SCORE " + String(~~currentScore).padStart(5, 0);

  // フレームカウンター
  animationFrame++;

  // ジャンプ処理
  if (jump > -20) {
    player.y += jump / 3;
    jump--;
    player.px = 0;
    player.py = 100;
  } else {
    player.y = 20; // 着地位置を20pxに強制的にリセットする
    player.py = 0;
    // 走るアニメーション
    if (animationFrame % Math.floor(15 - gameSpeed) === 0) {
      playerSpriteX = playerSpriteX === 0 ? 100 : 0;
      player.px = playerSpriteX;
    }
  }

  // 障害物タイマー
  if (obstacleTimer > 0) {
    obstacleTimer--;
  }
  if (obstacleTimer <= 0) {
    enemy.visible();
    enemy.x -= gameSpeed; // ゲーム速度をそのまま使用
  }

  // 障害物が画面外に出たらリセット
  if (enemy.x <= 0) {
    enemy.hide();
    obstacleTimer = Math.random() * 200 + 100;
    enemy.x = frame.el.offsetWidth;
  }

  // 当たり判定 (GAMEOVER)
  if (enemy.x > 30 && enemy.x < 110 && player.y < 60) {
    player.px = 100;
    player.py = 100;
    gameoverScreen.visible();
    return;
  }

  // 次のフレームを予約
  requestAnimationFrame(gameLoop);
}

// ゲーム開始
requestAnimationFrame(gameLoop);
