import React from "react";
import AccordionItem from "./AccordionItem";
import "./App.css";

/**
 * ファイル構造データの定義
 * file_tree.txt に基づいて生成
 */
const FILE_STRUCTURE = [
  {
    id: "public_html",
    name: "public_html", // public_html_tree.txt の '.'
    children: [
      {
        id: "app-admin",
        name: "app-admin.kizuki.or.jp",
        children: [], // 第2階層
      },
      {
        id: "app-super",
        name: "app-super.kizuki.or.jp",
        children: [], // 第2階層
      },
      {
        id: "app",
        name: "app.kizuki.or.jp",
        children: [], // 第2階層
      },
      { id: "apple-touch-icon", name: "apple-touch-icon.png" },
      {
        id: "asset",
        name: "asset",
        children: [], // 第2階層
      },
      {
        id: "assets",
        name: "assets",
        children: [], // 第2階層
      },
      {
        id: "csv",
        name: "csv",
        children: [], // 第2階層
      },
      { id: "favicon", name: "favicon.ico" },
      // file_tree.txt 自体は除外
      {
        id: "form2",
        name: "form2",
        children: [], // 第2階層
      },
      { id: "google-1", name: "google621bb49a4aa7bea4.html" },
      { id: "google-2", name: "google7c02369e2e4cc9ce.html" },
      { id: "google-3", name: "googlea5d71dd0983225a5.html" },
      { id: "google-4", name: "googlee5b8493aee483d20.html" },
      { id: "index-php", name: "index.php" },
      {
        id: "ir",
        name: "ir",
        children: [], // 第2階層
      },
      {
        id: "kbc-test2023",
        name: "kbc-test2023.kizuki.or.jp",
        children: [], // 第2階層
      },
      {
        id: "kbc",
        name: "kbc.kizuki.or.jp",
        children: [], // 第2階層
      },
      { id: "kizuki-csv", name: "kizuki_sf7dbplugin_submits.csv" },
      {
        id: "onlinelp",
        name: "onlinelp",
        children: [], // 第2階層
      },
      {
        id: "ouen-assets",
        name: "ouen-assets",
        children: [], // 第2階層
      },
      { id: "privacy", name: "privacy.html" },
      { id: "robots", name: "robots.txt" },
      { id: "setcookie", name: "setcookie.php" },
      {
        id: "stg",
        name: "stg.kizuki.or.jp",
        children: [], // 第2階層
      },
      {
        id: "test",
        name: "test.kizuki.or.jp",
        children: [], // 第2階層
      },
      {
        id: "test2023",
        name: "test2023.kizuki.or.jp",
        children: [], // 第2階層
      },
      {
        id: "transition-12768",
        name: "transition-12768",
        children: [], // 第2階層
      },
      {
        id: "transition-13220",
        name: "transition-13220",
        children: [], // 第2階層
      },
      {
        id: "transition-15556",
        name: "transition-15556",
        children: [], // 第2階層
      },
      {
        id: "transition-15629",
        name: "transition-15629",
        children: [], // 第2階層
      },
      {
        id: "transition-23680",
        name: "transition-23680",
        children: [], // 第2階層
      },
      {
        id: "transition-25761",
        name: "transition-25761",
        children: [], // 第2階層
      },
      {
        id: "transition-26135",
        name: "transition-26135",
        children: [], // 第2階層
      },
      {
        id: "transition-26268",
        name: "transition-26268",
        children: [], // 第2階層
      },
      {
        id: "transition-26285",
        name: "transition-26285",
        children: [], // 第2階層
      },
      {
        id: "transition-26545",
        name: "transition-26545",
        children: [], // 第2階層
      },
      {
        id: "wordpress",
        name: "wordpress",
        children: [
          // ▼ wordpress_tree.txt の内容 ▼
          { id: "wp-index-php", name: "index.php" },
          { id: "wp-license", name: "license.txt" },
          { id: "wp-loginUh9dNfDj", name: "loginUh9dNfDj.php" },
          { id: "wp-readme-ja", name: "readme-ja.html" },
          { id: "wp-readme", name: "readme.html" },
          { id: "wp-activate", name: "wp-activate.php" },
          { id: "wp-admin", name: "wp-admin", children: [] }, // フォルダ
          { id: "wp-blog-header", name: "wp-blog-header.php" },
          { id: "wp-comments-post", name: "wp-comments-post.php" },
          { id: "wp-config-sample", name: "wp-config-sample.php" },
          { id: "wp-config", name: "wp-config.php" },
          {
            id: "wp-content",
            name: "wp-content",
            children: [
              // ▼ wp-content_tree.txt (Source 6) の内容を反映 ▼
              {
                id: "wp-content-ai1wm-backups",
                name: "ai1wm-backups",
                children: [],
              },
              { id: "wp-content-index", name: "index.php" },
              { id: "wp-content-languages", name: "languages", children: [] },
              { id: "wp-content-plugins", name: "plugins", children: [] },
              {
                id: "wp-content-themes", // IDを調整
                name: "themes",
                children: [
                  // ▼ themes_tree.txt の内容 ▼
                  { id: "themes-index-php", name: "index.php" },
                  {
                    id: "themes-kizuki-or-jp",
                    name: "kizuki_or_jp",
                    children: [
                      // ▼ kizuki_or_jp_tree.txt の内容 ▼
                      { id: "kizuki-404-company", name: "404-company.php" },
                      { id: "kizuki-404", name: "404.php" },
                      { id: "kizuki-aboutus", name: "aboutus", children: [] },
                      { id: "kizuki-archive-blog", name: "archive-blog.php" },
                      {
                        id: "kizuki-archive-company-1904",
                        name: "archive-company-1904.php",
                      },
                      {
                        id: "kizuki-archive-company",
                        name: "archive-company.php",
                      },
                      {
                        id: "kizuki-archive-kbc-test",
                        name: "archive-kbc-test.php",
                      },
                      { id: "kizuki-archive-kbc", name: "archive-kbc.php" },
                      {
                        id: "kizuki-archive-teachers",
                        name: "archive-teachers.php",
                      },
                      {
                        id: "kizuki-archive-voice-test",
                        name: "archive-voice-test.php",
                      },
                      { id: "kizuki-archive-voice", name: "archive-voice.php" },
                      { id: "kizuki-archive", name: "archive.php" },
                      {
                        id: "kizuki-backup-archive-teachers",
                        name: "backup-before202001_archive-teachers.php",
                      },
                      { id: "kizuki-blog", name: "blog", children: [] },
                      { id: "kizuki-category-news", name: "category-news.php" },
                      { id: "kizuki-category", name: "category.php" },
                      { id: "kizuki-company", name: "company", children: [] },
                      { id: "kizuki-contact", name: "contact", children: [] },
                      { id: "kizuki-courses", name: "courses", children: [] },
                      { id: "kizuki-date", name: "date.php" },
                      { id: "kizuki-donation", name: "donation", children: [] },
                      { id: "kizuki-foot-top", name: "foot-top.php" },
                      { id: "kizuki-foot", name: "foot.php" },
                      { id: "kizuki-footer", name: "footer.php" },
                      {
                        id: "kizuki-front-page-test",
                        name: "front-page-test.php",
                      },
                      { id: "kizuki-front-page", name: "front-page.php" },
                      { id: "kizuki-functions", name: "functions.php" },
                      {
                        id: "kizuki-futoko-lp",
                        name: "futoko_lp",
                        children: [],
                      },
                      { id: "kizuki-head-column", name: "head-column.php" },
                      { id: "kizuki-head", name: "head.php" },
                      { id: "kizuki-header", name: "header.php" },
                      { id: "kizuki-index", name: "index.php" },
                      {
                        id: "kizuki-juku-floating-cta",
                        name: "juku-floating-cta.php",
                      },
                      { id: "kizuki-juku-foot", name: "juku-foot.php" },
                      { id: "kizuki-kbc", name: "kbc", children: [] },
                      { id: "kizuki-ouen", name: "ouen", children: [] },
                      { id: "kizuki-page-about", name: "page-about.php" },
                      {
                        id: "kizuki-page-chutai-osaka-top",
                        name: "page-chutai_osaka-top.php",
                      },
                      {
                        id: "kizuki-page-chutai-top",
                        name: "page-chutai-top.php",
                      },
                      {
                        id: "kizuki-page-donationlp-sp",
                        name: "page-donationlp-sp.php",
                      },
                      {
                        id: "kizuki-page-donationlp",
                        name: "page-donationlp.php",
                      },
                      {
                        id: "kizuki-page-form-thanks-yagaku",
                        name: "page-form-thanks-yagaku.php",
                      },
                      {
                        id: "kizuki-page-form-thanks",
                        name: "page-form-thanks.php",
                      },
                      { id: "kizuki-page-form-v2", name: "page-form-v2.php" },
                      { id: "kizuki-page-form", name: "page-form.php" },
                      {
                        id: "kizuki-page-form2-thanks",
                        name: "page-form2-thanks.php",
                      },
                      { id: "kizuki-page-form2", name: "page-form2.php" },
                      {
                        id: "kizuki-page-front-page-test",
                        name: "page-front-page-test.php",
                      },
                      {
                        id: "kizuki-page-futoko-osaka-top",
                        name: "page-futoko_osaka-top.php",
                      },
                      {
                        id: "kizuki-page-futoko-top",
                        name: "page-futoko-top.php",
                      },
                      {
                        id: "kizuki-page-highschool",
                        name: "page-highschool.php",
                      },
                      {
                        id: "kizuki-page-hogosya-osaka-top",
                        name: "page-hogosya_osaka-top.php",
                      },
                      {
                        id: "kizuki-page-hogosya-top",
                        name: "page-hogosya-top.php",
                      },
                      { id: "kizuki-page-kbc-form", name: "page-kbc-form.php" },
                      {
                        id: "kizuki-page-kbc-thanks",
                        name: "page-kbc-thanks.php",
                      },
                      { id: "kizuki-page-parent", name: "page-parent.php" },
                      {
                        id: "kizuki-page-redirect-formbridge-contactform",
                        name: "page-redirect-formbridge-contactform.php",
                      },
                      {
                        id: "kizuki-page-syakaijin-osaka-top",
                        name: "page-syakaijin_osaka-top.php",
                      },
                      {
                        id: "kizuki-page-syakaijin-top",
                        name: "page-syakaijin-top.php",
                      },
                      { id: "kizuki-page-test", name: "page-test.php" },
                      {
                        id: "kizuki-page-top-osaka",
                        name: "page-top_osaka.php",
                      },
                      {
                        id: "kizuki-page-tsushin-high-top",
                        name: "page-tsushin-high-top.php",
                      },
                      {
                        id: "kizuki-page-tsushin-junior-top",
                        name: "page-tsushin-junior-top.php",
                      },
                      { id: "kizuki-page", name: "page.php" },
                      {
                        id: "kizuki-questions",
                        name: "questions",
                        children: [],
                      },
                      { id: "kizuki-serach", name: "serach.php" },
                      {
                        id: "kizuki-sidebar-column",
                        name: "sidebar-column.php",
                      },
                      {
                        id: "kizuki-sidebar-monthly",
                        name: "sidebar-monthly.php",
                      },
                      { id: "kizuki-sidebar", name: "sidebar.php" },
                      { id: "kizuki-single-blog", name: "single-blog.php" },
                      { id: "kizuki-single-column", name: "single-column.php" },
                      {
                        id: "kizuki-single-company-2023",
                        name: "single-company-2023.php",
                      },
                      {
                        id: "kizuki-single-company-cookie",
                        name: "single-company-cookie.php",
                      },
                      {
                        id: "kizuki-single-company-withmv",
                        name: "single-company-withmv.php",
                      },
                      {
                        id: "kizuki-single-company",
                        name: "single-company.php",
                      },
                      {
                        id: "kizuki-single-kbc-column-chic",
                        name: "single-kbc-column-chic.php",
                      },
                      {
                        id: "kizuki-single-kbc-staff",
                        name: "single-kbc-staff.php",
                      },
                      {
                        id: "kizuki-single-kbc-teacher",
                        name: "single-kbc-teacher.php",
                      },
                      {
                        id: "kizuki-single-kbc-voice",
                        name: "single-kbc-voice.php",
                      },
                      { id: "kizuki-single-kbc", name: "single-kbc.php" },
                      {
                        id: "kizuki-single-redirect-line-kbc",
                        name: "single-redirect-line-kbc.php",
                      },
                      {
                        id: "kizuki-single-redirect-line",
                        name: "single-redirect-line.php",
                      },
                      {
                        id: "kizuki-single-redirect-select-kbc",
                        name: "single-redirect-select-kbc.php",
                      },
                      {
                        id: "kizuki-single-redirect",
                        name: "single-redirect.php",
                      },
                      {
                        id: "kizuki-single-teachers",
                        name: "single-teachers.php",
                      },
                      { id: "kizuki-single-voice", name: "single-voice.php" },
                      { id: "kizuki-single", name: "single.php" },
                      { id: "kizuki-style", name: "style.css" },
                      { id: "kizuki-tag", name: "tag.php" },
                      { id: "kizuki-targets", name: "targets", children: [] },
                      {
                        id: "kizuki-taxonomy-blog-category",
                        name: "taxonomy-blog-category.php",
                      },
                      {
                        id: "kizuki-taxonomy-blog-tag",
                        name: "taxonomy-blog-tag.php",
                      },
                      {
                        id: "kizuki-taxonomy-company-category",
                        name: "taxonomy-company-category.php",
                      },
                      {
                        id: "kizuki-taxonomy-company-tag",
                        name: "taxonomy-company-tag.php",
                      },
                      { id: "kizuki-test", name: "test", children: [] },
                      { id: "kizuki-video", name: "video", children: [] },
                    ],
                  },
                  {
                    id: "themes-twentytwentyfive",
                    name: "twentytwentyfive",
                    children: [],
                  },
                  {
                    id: "themes-twentytwentyfour",
                    name: "twentytwentyfour",
                    children: [],
                  },
                ],
              },
              { id: "wp-content-upgrade", name: "upgrade", children: [] },
              {
                id: "wp-content-upgrade-temp",
                name: "upgrade-temp-backup",
                children: [],
              },
              { id: "wp-content-uploads", name: "uploads", children: [] },
              // ▲ wp-content_tree.txt (Source 6) の内容を反映 ▲
            ],
          },
          { id: "wp-cron", name: "wp-cron.php" },
          { id: "wp-includes", name: "wp-includes", children: [] }, // フォルダ
          { id: "wp-links-opml", name: "wp-links-opml.php" },
          { id: "wp-load", name: "wp-load.php" },
          { id: "wp-login", name: "wp-login.php" },
          { id: "wp-mail", name: "wp-mail.php" },
          { id: "wp-settings", name: "wp-settings.php" },
          { id: "wp-signup", name: "wp-signup.php" },
          { id: "wp-trackback", name: "wp-trackback.php" },
          { id: "wp-xmlrpc", name: "xmlrpc.php" },
          // ▲ wordpress_tree.txt の内容 ▲
        ],
      },
      {
        id: "wp",
        name: "wp",
        children: [], // 第2階層
      },
      {
        id: "xmailinglist",
        name: "xmailinglist",
        children: [], // 第2階層
      },
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
