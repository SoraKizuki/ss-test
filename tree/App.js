import React from "react";
import AccordionItem from "./AccordionItem"; // 作成したコンポーネントをインポート
import "./styles.css"; // スタイルシートをインポート

// アップロードされたファイル(kizuki.or.jp.txt)の構造を元にしたデータ
// (一部抜粋・構造化)
const fileStructure = [
  {
    name: "public_html",
    children: [
      {
        name: "app-admin.kizuki.or.jp",
        children: [{ name: "default_page.png" }, { name: "index.html" }],
      },
      {
        name: "app-super.kizuki.or.jp",
        children: [{ name: "default_page.png" }, { name: "index.html" }],
      },
      {
        name: "app.kizuki.or.jp",
        children: [{ name: "default_page.png" }, { name: "index.html" }],
      },
      { name: "apple-touch-icon.png" },
      {
        name: "asset",
        children: [
          {
            name: "img",
            children: [
              { name: "131130_seminar.jpg" },
              { name: "1x1.gif" },
              { name: "92percent_new.png" },
              { name: "92percent.png" },
              // ... 他の画像ファイル
            ],
          },
        ],
      },
      {
        name: "assets",
        children: [
          { name: "cssmin" },
          { name: "fonts" },
          { name: "img" },
          { name: "js" },
          { name: "less" },
        ],
      },
      // ... 他のファイルやフォルダ
    ],
  },
  // 他のトップレベルのファイル/フォルダもここに追加できます
];

function App() {
  return (
    <div className="App">
      <h1>アコーディオンメニュー (React)</h1>

      {/* データをマップしてAccordionItemコンポーネントのリストを生成 */}
      <ul className="accordion">
        {fileStructure.map((item, index) => (
          <AccordionItem key={index} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default App;
