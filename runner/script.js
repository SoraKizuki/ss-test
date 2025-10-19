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

// 2体のエネミーをオブジェクトの配列で管理
const enemies = [
  { obj: enemy1, timer: 100 },
  { obj: enemy2, timer: 250 },
];

// --- 速度を管理する変数 ---
let gameSpeed = 5;
const maxGameSpeed = 16;
// ★変更点: 最低速度を追加し、一定の加速度を削除
const minGameSpeed = 4;
// ★変更点: 速度を変更するタイミングを管理するタイマー
let speedChangeTimer = 120; // 最初の変更は2秒後 (60fpsの場合)

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
  if (isGameOver) {
    return;
  }

  // ★★★ここからが変更箇所★★★
  // --- 不規則なスピード変更処理 ---
  speedChangeTimer--;
  if (speedChangeTimer <= 0) {
    // 次の速度変更までの時間をランダムに設定 (1.5秒〜3.5秒)
    speedChangeTimer = Math.random() * 120 + 90;

    // 速度の変更量をランダムに決定 (-0.5 ~ +1.0)
    // プラスになりやすく、少しずつ速くなる傾向を持たせる
    const speedChange = Math.random() * 1.5 - 0.5;
    gameSpeed += speedChange;

    // 速度が最小値・最大値の範囲に収まるように調整
    if (gameSpeed < minGameSpeed) {
      gameSpeed = minGameSpeed;
    }
    if (gameSpeed > maxGameSpeed) {
      gameSpeed = maxGameSpeed;
    }
  }
  // ★★★ここまでが変更箇所★★★

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
    player.y += jump / 3;
    jump--;
    player.px = 0;
    player.py = 100;
  } else {
    player.y = 20;
    player.py = 0;
    // 走るアニメーション
    if (animationFrame % Math.floor(15 - gameSpeed) === 0) {
      playerSpriteX = playerSpriteX === 0 ? 100 : 0;
      player.px = playerSpriteX;
    }
  }

  // エネミーのループ処理
  enemies.forEach((enemy, index) => {
    // 障害物タイマー
    if (enemy.timer > 0) {
      enemy.timer--;
    }
    if (enemy.timer <= 0) {
      enemy.obj.visible();
      enemy.obj.x -= gameSpeed;
    }

    // 障害物が画面外に出たらリセット
    if (enemy.obj.x <= 0) {
      enemy.obj.hide();

      if (index === 0) {
        enemy.timer = Math.random() * 80 + 150;
      } else {
        enemy.timer = Math.random() * 154 + 253;
      }

      enemy.obj.x = frame.el.offsetWidth;
    }

    // 当たり判定
    if (enemy.obj.x > 30 && enemy.obj.x < 110 && player.y < 60) {
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
