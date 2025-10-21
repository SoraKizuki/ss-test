import React from "react";
import AccordionItem from "./AccordionItem";
import "./styles.css";

/**
 * ファイル構造データの定義
 * データとUIを分離し、メンテナンス性を向上
 */
const FILE_STRUCTURE = [
  {
    id: "public_html",
    name: "public_html",
    children: [
      {
        id: "app-admin",
        name: "app-admin.kizuki.or.jp",
        children: [
          { id: "app-admin-default", name: "default_page.png" },
          { id: "app-admin-index", name: "index.html" },
        ],
      },
      {
        id: "app-super",
        name: "app-super.kizuki.or.jp",
        children: [
          { id: "app-super-default", name: "default_page.png" },
          { id: "app-super-index", name: "index.html" },
        ],
      },
      {
        id: "app",
        name: "app.kizuki.or.jp",
        children: [
          { id: "app-default", name: "default_page.png" },
          { id: "app-index", name: "index.html" },
        ],
      },
      { id: "apple-touch-icon", name: "apple-touch-icon.png" },
      {
        id: "asset",
        name: "asset",
        children: [
          {
            id: "asset-img",
            name: "img",
            children: [
              { id: "img-1", name: "131130_seminar.jpg" },
              { id: "img-2", name: "1x1.gif" },
              { id: "img-3", name: "92percent_new.png" },
              { id: "img-4", name: "92percent.png" },
              { id: "img-5", name: "about_mv.jpg" },
              { id: "img-6", name: "arrow.png" },
              { id: "img-7", name: "bg_footer.jpg" },
              { id: "img-8", name: "bg_main.jpg" },
              { id: "img-9", name: "btn_more.png" },
              { id: "img-10", name: "case_img01.jpg" },
            ],
          },
        ],
      },
      {
        id: "assets",
        name: "assets",
        children: [
          { id: "assets-cssmin", name: "cssmin" },
          { id: "assets-fonts", name: "fonts" },
          { id: "assets-img", name: "img" },
          { id: "assets-js", name: "js" },
          { id: "assets-less", name: "less" },
        ],
      },
      { id: "browserconfig", name: "browserconfig.xml" },
      {
        id: "case",
        name: "case",
        children: [{ id: "case-index", name: "index.html" }],
      },
      {
        id: "common",
        name: "common",
        children: [
          {
            id: "common-css",
            name: "css",
            children: [{ id: "css-style", name: "style.css" }],
          },
          {
            id: "common-img",
            name: "img",
            children: [
              { id: "common-img-1", name: "logo.png" },
              { id: "common-img-2", name: "nav_icon.png" },
            ],
          },
          {
            id: "common-js",
            name: "js",
            children: [
              { id: "js-common", name: "common.js" },
              { id: "js-jquery", name: "jquery.min.js" },
            ],
          },
        ],
      },
      { id: "favicon", name: "favicon.ico" },
      { id: "index", name: "index.html" },
      { id: "robots", name: "robots.txt" },
    ],
  },
];

/**
 * メインアプリケーションコンポーネント
 * ファイル構造をアコーディオンメニューとして表示
 */
const App = () => {
  return (
    <div className="App">
      <header>
        <h1>アコーディオンメニュー (React)</h1>
      </header>

      <main className="accordion-container">
        <nav aria-label="ファイル構造ナビゲーション">
          <ul className="accordion">
            {FILE_STRUCTURE.map((item) => (
              <AccordionItem key={item.id} item={item} />
            ))}
          </ul>
        </nav>
      </main>
    </div>
  );
};

export default App;
