/** おみくじLP - 2026年 新年版 */

// ========================================
// 1. 定数と設定
// ========================================

const CONFIG = {
  CSS: {
    SHAKING: "shaking",
    HIDDEN: "hidden",
    GREAT_LUCK: "great-luck",
    NO_SCROLL: "no-scroll",
    FUSUMA_OPEN: "open",
    FUSUMA_FADE: "fade-out",
  },

  IMAGES: {
    BEAR_DEFAULT: "img/omikuji-kuma.png",
    BEAR_RESULT: "img/omikuji-result.png",
    BOX_DEFAULT: "img/omikuji-box1.png",
    BOX_RESULT: "img/omikuji-box2.png",
  },

  // アニメーション時間（ミリ秒）
  TIMING: {
    FUSUMA_TRANSFORM: 1500,
    FUSUMA_FADE: 500,
  },

  // おみくじ結果データ
  FORTUNES: [
    {
      keka: "大吉",
      weight: 10,
      comments: [
        "最高の運勢です！何事も積極的に挑戦しましょう。",
        "努力が実を結ぶ、実りの多い一年になるでしょう。",
        "幸運が舞い込む予感。自信を持って進みなさい。",
      ],
    },
    {
      keka: "中吉",
      weight: 20,
      comments: [
        "吉凶混合ですが、努力次第で良い結果が得られます。",
        "願いは叶いますが、少し時間がかかるかもしれません。",
        "現状維持で安定。欲張りすぎは禁物です。",
      ],
    },
    {
      keka: "小吉",
      weight: 25,
      comments: [
        "まずまずの運勢です。焦らず着実に進めましょう。",
        "小さな幸せを見つけられる日。感謝を忘れずに。",
        "日々の行いが運を開きます。",
      ],
    },
    {
      keka: "吉",
      weight: 15,
      comments: [
        "平均的な運勢です。平凡な中に喜びがあります。",
        "特筆すべきことはありませんが、平穏無事です。",
        "今の生活を大切に。",
      ],
    },
    {
      keka: "末吉",
      weight: 15,
      comments: [
        "これから運気が上昇します。今は耐え時です。",
        "少し注意が必要。謙虚な姿勢を心がけてください。",
        "油断せず、着実に準備を進めましょう。",
      ],
    },
  ],
};

// ========================================
// 2. 状態管理
// ========================================

const state = {
  isDrawing: false,
  hasDrawn: false,
};

// ========================================
// 3. DOM要素のキャッシュ
// ========================================

const elements = {};

function cacheElements() {
  elements.drawButton = document.getElementById("draw-button");
  elements.boxImage = document.getElementById("box-image");
  elements.bearImage = document.getElementById("bear-image");
  elements.resultArea = document.getElementById("result-area");
  elements.resultKeka = document.getElementById("result-keka");
  elements.resultComment = document.getElementById("result-comment");
  elements.fusumaScreen = document.getElementById("fusuma-screen");
  elements.body = document.body;
}

// ========================================
// 4. ユーティリティ関数
// ========================================

function addClass(el, className) {
  if (el) el.classList.add(className);
}

function removeClass(el, className) {
  if (el) el.classList.remove(className);
}

function setImageSrc(imgEl, src) {
  if (imgEl) {
    imgEl.src = src;
  }
}

function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/** 指定時間だけ待つ */
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ========================================
// 5. おみくじロジック
// ========================================

/** 重み付きでおみくじを引く */
function drawFortune() {
  const totalWeight = CONFIG.FORTUNES.reduce(
    (sum, item) => sum + item.weight,
    0
  );
  let random = Math.random() * totalWeight;

  for (const fortune of CONFIG.FORTUNES) {
    if (random < fortune.weight) {
      const randomComment =
        fortune.comments[Math.floor(Math.random() * fortune.comments.length)];
      return { keka: fortune.keka, comment: randomComment };
    }
    random -= fortune.weight;
  }

  return { keka: "吉", comment: "平穏な一年になるでしょう。" };
}

/** 結果を表示する */
function displayResult(result) {
  elements.resultKeka.textContent = result.keka;
  elements.resultComment.textContent = result.comment;
  setImageSrc(elements.bearImage, CONFIG.IMAGES.BEAR_RESULT);
  setImageSrc(elements.boxImage, CONFIG.IMAGES.BOX_RESULT);
  if (result.keka === "大吉")
    addClass(elements.resultKeka, CONFIG.CSS.GREAT_LUCK);
  else removeClass(elements.resultKeka, CONFIG.CSS.GREAT_LUCK);
  removeClass(elements.resultArea, CONFIG.CSS.HIDDEN);
}

/** 初期状態へ戻す */
function resetState() {
  setImageSrc(elements.bearImage, CONFIG.IMAGES.BEAR_DEFAULT);
  setImageSrc(elements.boxImage, CONFIG.IMAGES.BOX_DEFAULT);
  addClass(elements.resultArea, CONFIG.CSS.HIDDEN);
  removeClass(elements.resultKeka, CONFIG.CSS.GREAT_LUCK);
  elements.resultKeka.className = "result-keka";
}

/** 箱をシェイクする */
function animateBoxShake() {
  return new Promise((resolve) => {
    const handleAnimationEnd = () => {
      elements.boxImage.removeEventListener("animationend", handleAnimationEnd);
      removeClass(elements.boxImage, CONFIG.CSS.SHAKING);
      resolve();
    };

    addClass(elements.boxImage, CONFIG.CSS.SHAKING);
    elements.boxImage.addEventListener("animationend", handleAnimationEnd);
  });
}

/** おみくじを実行する */
async function handleDraw() {
  if (state.isDrawing) return;

  state.isDrawing = true;
  elements.drawButton.disabled = true;

  try {
    if (state.hasDrawn) resetState();
    await animateBoxShake();
    const result = drawFortune();
    displayResult(result);
    elements.drawButton.style.display = "none";
    state.hasDrawn = true;
  } catch (error) {
    console.error("おみくじ実行中にエラーが発生しました:", error);
    elements.drawButton.disabled = false;
  } finally {
    state.isDrawing = false;
  }
}

// ========================================
// 6. 襖（ふすま）開幕アニメーション
// ========================================

/**
 * 襖の開幕アニメーションを実行する
 */
async function startFusumaAnimation() {
  if (!elements.fusumaScreen) return;

  addClass(elements.body, CONFIG.CSS.NO_SCROLL);
  await wait(100);
  addClass(elements.fusumaScreen, CONFIG.CSS.FUSUMA_OPEN);
  await wait(CONFIG.TIMING.FUSUMA_TRANSFORM);
  addClass(elements.fusumaScreen, CONFIG.CSS.FUSUMA_FADE);
  await wait(CONFIG.TIMING.FUSUMA_FADE);
  removeClass(elements.body, CONFIG.CSS.NO_SCROLL);
  elements.fusumaScreen.style.display = "none";
}

// ========================================
// 7. イベントハンドラ
// ========================================

/** イベントリスナーを設定する */
function setupEventListeners() {
  if (elements.drawButton) {
    elements.drawButton.addEventListener("click", handleDraw);
    elements.drawButton.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleDraw();
      }
    });
  }
}

/** 重要画像をプリロードする */
async function preloadCriticalImages() {
  const imagesToPreload = [CONFIG.IMAGES.BEAR_RESULT, CONFIG.IMAGES.BOX_RESULT];

  try {
    await Promise.all(imagesToPreload.map(preloadImage));
  } catch (error) {
    console.warn("一部の画像のプリロードに失敗しました:", error);
  }
}

// ========================================
// 8. 初期化
// ========================================

async function initialize() {
  cacheElements();
  preloadCriticalImages();
  setupEventListeners();
  startFusumaAnimation();
}

// ========================================
// 9. エントリポイント
// ========================================

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  initialize();
}
