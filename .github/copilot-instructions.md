このリポジトリは複数の小さなブラウザゲーム（オセロ、数独、作務など）を HTML/CSS/JS で実装したワークスペースです。AI エージェントが素早く作業に入れるよう、プロジェクト固有の重要点と例を短くまとめます。

- 構造（重要なフォルダ/ファイル）

  - ルート: `index.html`（ゲーム選択）
  - 各ゲーム: `reversi/`, `omikuji/`, `runner/`, `sudoku/` — 各フォルダに `*.html`, `script.js`, `style.css` がある
  - 画像: `img/`（共通として使われる場合あり）

- 大まかなアーキテクチャ

  - 各ゲームは単一ページで完結（HTML が UI、外部 `script.js` と `style.css` を読み込む）。DOM 操作とゲームロジックは `script.js` に全て含まれる。
  - ゲーム状態はモジュール化されておらずグローバルな `gameState` オブジェクトで管理されるパターンが多い（例: `reversi/script.js` の `gameState`）。

- 既存のコーディング/命名規約（プロジェクト固有）

  - ファイル名は小文字、短い英語（例: `script.js`, `style.css`）。
  - 色やプレイヤーは文字列（`"green"`, `"white"`）で扱われる。
  - UI は直接 DOM を更新して状態と同期する（仮想 DOM なし）。

- 実装パターンと注意点（具体例）

  - 合法手の判定は `getValidMoves(board, player)` と `getFlippablePieces(...)` に集約されている（`reversi/script.js`）。このロジックを変更する場合は両関数を最初に読む。
  - 描画は `renderBoard()` → `createPieceElement()` を経由。表示と内部状態は別々に管理されるので、`gameState.board` を更新 → 描画関数呼び出し の順にすると整合性が保てる。
  - UI 切替（例: ヒント表示）は input 要素（`#hintToggle`）の状態で制御する。見た目の切替だけにしたい場合、DOM のクラス付与のみ行う。

- 実行・デバッグ（ブラウザでのローカル確認）

  - 任意の静的サーバでルートをホストする（例: `npx http-server` や VS Code の Live Server）。ファイルは静的なのでビルドは不要。
  - 開発時はブラウザの DevTools（Console / Network）でエラーを確認。JS の変更後はページリロードが必要。

- テストと品質ゲート

  - 自動テストは含まれない。軽微な修正はブラウザで動作確認するのが最短。

- 変更ガイド（安全に編集するための手順）

  1. まず対象ゲームフォルダ内の `script.js` を開き、`gameState` と描画周り（`renderBoard`, `createPieceElement`）を把握する。
  2. 内部状態を変更する場合は必ず `gameState` を更新 → 関連 UI 更新関数（`updateStatus`, `updateTurnMessage`, `highlightValidMoves`, `renderBoard` 等）を呼ぶ。
  3. DOM に依存する条件（`classList` の有無など）を使うとヒントの ON/OFF で挙動が崩れることがある。可能なら状態判定は `gameState` や `getValidMoves` に委譲する。

- 典型的なタスクの例（簡潔）
  - "置ける場所の表示を ON/OFF にする": `#hintToggle` の change イベントで `highlightValidMoves(getValidMoves(...))` を呼ぶ。
  - "必殺で追加ターンを確保する": `gameState.extraTurn` を適切なタイミングでセット/クリアし、`nextTurn()` がそのフラグを正しく参照することを確認する（`reversi/script.js` を参照）。

もしこのファイルに追加してほしいルールや、よく使う開発コマンド（例: ローカルサーバ起動コマンド）などがあれば教えてください。簡潔に追記します。
