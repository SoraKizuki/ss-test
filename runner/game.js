class Game {
  constructor(id) {
    this.el = document.getElementById(id);
  }
  set x(v) {
    this.el.style.left = v + "px";
  }
  get x() {
    return parseFloat(getComputedStyle(this.el).left);
  }
  set y(v) {
    this.el.style.bottom = v + "px";
  }
  get y() {
    return parseFloat(getComputedStyle(this.el).bottom);
  }
  set text(v) {
    this.el.textContent = v;
  }
  hide() {
    this.el.style.visibility = "hidden";
  }
  visible() {
    this.el.style.visibility = "visible";
  }
  // 背景スクロール用 (px単位)
  set pxp(v) {
    this.el.style.backgroundPositionX = v + "px";
  }
  // スプライトアニメーション用 (X軸, %単位)
  set px(v) {
    this.el.style.backgroundPositionX = v + "%";
  }
  // スプライトアニメーション用 (Y軸, %単位)
  set py(v) {
    this.el.style.backgroundPositionY = v + "%";
  }
}

export const player = new Game("player");
export const enemy = new Game("enemy");
export const score = new Game("score");
export const frame = new Game("game");
export const gameoverScreen = new Game("gameover-screen");
