<?php
/**
 * Template Name:  プロ家庭教師LP-202507
 * Template Post Type: page
 */
$template_url = get_template_directory_uri();

// --- REFINEMENT: 1. 画像パスを変数化 ---
// このLPの画像アセットへのパスを一元管理します
$img_path = $template_url . '/img/ldp/pro-kateikyoushi-202507';
?>
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta name="robots" content="noindex" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="format-detection" content="telephone=no" />
    <title>キズキプロ家庭教師</title>
    <meta
      name="description"
      content="心の成長と志望校合格を両立するキズキプロ家庭教師。不登校や発達特性に寄り添い、15年の経験で一人ひとりの学びと自信を育てます。"
    />
    <meta property="og:site_name" content="キズキプロ家庭教師" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="キズキプロ家庭教師" />
    <meta
      property="og:description"
      content="心の成長と志望校合格を両立するキズキプロ家庭教師。不登校や発達特性に寄り添い、15年の経験で一人ひとりの学びと自信を育てます。"
    />
    <meta property="og:locale" content="ja_JP" />
    <meta name="twitter:card" content="summary_large_image" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Noto+Serif+JP:wght@400;700&display=swap"
      rel="stylesheet"
    />

    <link
      rel="preload"
      as="image"
      href="https://kizuki.or.jp/wp/wp-content/uploads/2025/11/top.webp"
      media="(min-width: 769px)"
    />
    <link
      rel="preload"
      as="image"
      href="https://kizuki.or.jp/wp/wp-content/uploads/2025/11/top-sp.webp"
      media="(max-width: 768px)"
    />
    <link
      rel="icon"
      href="<?php print $template_url; ?>/img/common/favicon.ico"
    />

     <link
      rel="stylesheet"
      href="<?php print $template_url; ?>/css/ldp/pro-kateikyoushi-202507/style.css"
    />
  </head>

  <body>
    <header>
      <div>
        <h1>
          <a href="#mv">
            <img
              src="https://kizuki.or.jp/wp/wp-content/uploads/2025/11/logo_pro-teacher.webp"
              alt="キズキプロ家庭教師"
              width="200"
              height="40"
              loading="eager"
            />
          </a>
        </h1>
        <a href="tel:0120-501-858" class="tel">
          お電話問い合わせ<br />
          <span>0120-501-858</span>
        </a>
      </div>
    </header>

    <main>
      <section id="mv">
        <figure>
          <picture>
            <source
              media="(min-width: 769px)"
              srcset="
                https://kizuki.or.jp/wp/wp-content/uploads/2025/11/top-2.webp
              "
            />
            <img
              src="https://kizuki.or.jp/wp/wp-content/uploads/2025/11/top-sp-2.webp"
              alt="勉強に関する悩みを持つ生徒のイラスト"
              width="1125"
              height="1429"
            />
          </picture>
        </figure>
      </section>
      <section id="features">
        <h2>
          <span> キズキ式で不登校から<span>逆転の物語</span> </span>
        </h2>
        <p>
          キズキ共育塾は、どんな状況からでも何度でも「やり直す」サポートをしてきました。生徒一人ひとりに寄り添うプロ講師が、丁寧なカウンセリングとあなただけのオーダーメイドの勉強法でサポートします。通塾が難しくても、勉強に自信がなくても、今は夢を描けなくても大丈夫。
          あなたのペースに合わせた指導が可能です。焦らず、まずは半歩から。<br />
          あなたの人生という物語は、まだ始まったばかり。<br />
          キズキプロ家庭教師が、ハッピーエンドへの道を一緒に描きます。
        </p>
      </section>

      <section id="concerns">
        <article>
          <h2>
            <span> 徹底的に寄り添うサポート体制 </span>
          </h2>
          <div>
            <figure>
              <img
                src="https://kizuki.or.jp/wp/wp-content/uploads/2025/11/lp2507-recommend.webp"
                alt="勉強に関する悩みを持つ生徒のイラスト"
                loading="lazy"
                width="400"
                height="300"
              />
            </figure>
            <div>
              <ul>
                <li>
                  <span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 12.6111L8.99596 17.607L20.6074 6"
                        stroke="#004d40"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <p>
                    これまでの<strong class="change"
                      >勉強の遅れを取り戻したい</strong
                    >
                  </p>
                </li>
                <li>
                  <span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 12.6111L8.99596 17.607L20.6074 6"
                        stroke="#004d40"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <p>
                    勉強に対する<strong class="change"
                      >抵抗感・不安がある</strong
                    >
                  </p>
                </li>
                <li>
                  <span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 12.6111L8.99596 17.607L20.6074 6"
                        stroke="#004d40"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <p>
                    自分で<strong class="change"
                      >勉強しようと思っても続かない</strong
                    >
                  </p>
                </li>
                <li>
                  <span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 12.6111L8.99596 17.607L20.6074 6"
                        stroke="#004d40"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <p>
                    合格して<strong class="change">周りの人を見返したい</strong>
                  </p>
                </li>
                <li>
                  <span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 12.6111L8.99596 17.607L20.6074 6"
                        stroke="#004d40"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <p><strong class="change">続けられるのか不安</strong></p>
                </li>
                <li>
                  <span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 12.6111L8.99596 17.607L20.6074 6"
                        stroke="#004d40"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <p>
                    知らない人と<strong class="change">話をするのが苦手</strong>
                  </p>
                </li>
              </ul>
              <div aria-hidden="true" style="text-align: center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="#bfa975"
                >
                  <path d="M7 2 L17 2 L17 12 L21 12 L12 22 L3 12 L7 12 Z" />
                </svg>
              </div>
              <h3>
                キズキプロ家庭教師なら、<br />
                どこからでも合格を目指せます！
              </h3>
            </div>
          </div>
        </article>
      </section>

      <section id="strengths">
        <h2>
          <span>
            <span>キズキプロ家庭教師の</span>
            <br />
            <span>3</span>
            <span>つの強み</span>
          </span>
        </h2>
        <ul>
          <li>
            <div>
              <p>
                Strong Point
                <span>01</span>
              </p>
            </div>
            <h3>圧倒的な<span>サポート実績</span></h3>
            <div>
              <p>
                <span class="change"
                  >約15年間で10,000人以上の不登校の生徒さんと伴走</span
                >し、目標達成に導いてきました。
              </p>
            </div>
          </li>
          <li>
            <div>
              <p>
                Strong Point
                <span>02</span>
              </p>
            </div>
            <h3>選び抜かれた<span>プロ教師</span></h3>
            <div>
              <p>
                不登校の生徒への指導歴や合格実績で総合的に評価した、<span
                  class="change"
                  >選りすぐりの教師のみが「プロ家庭教師」として指導</span
                >します。
              </p>
            </div>
          </li>
          <li>
            <div>
              <p>
                Strong Point
                <span>03</span>
              </p>
            </div>
            <h3>キズキ式<span>オーダーメイド</span></h3>
            <div>
              <p>
                一人ひとりの学習状況や目標に合わせて、
                <span class="change"
                  >専属の共育コンサルタントがあなただけのプランを設計</span
                >。授業開始後もメンターとしてサポートします。
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section id="support">
        <h2>
          <span>
            <span>不登校・特性があっても安心</span>
            <br />
            <span>3</span>
            <span>つのメンター</span>
            <span>サポート</span>
          </span>
        </h2>
        <ul>
          <li>
            <div>
              <p>
                Support Point
                <span>01</span>
              </p>
            </div>
            <h3>メンタルサポート</h3>
            <div>
              <p>
                新しい人に会う時、勉強を始める時、大きな不安やストレスがかかりますよね。<br />
                キズキでは、<span class="change"
                  >コミュニケーションや勉強への抵抗感も否定せず受け止めながら、同じ目線で伴走します。</span
                ><br />
                心身の調子に合わせて、前日まで授業の振替ができるので、無理なく続けられます。
              </p>
            </div>
          </li>
          <li>
            <div>
              <p>
                Support Point
                <span>02</span>
              </p>
            </div>
            <h3>学習サポート</h3>
            <div>
              <p>
                <span class="change"
                  >授業の時間だけでなく、自宅でも一人で勉強を進められるよう、環境づくりからサポートします。</span
                ><br />
                あなたに合った勉強方法を一緒に見つけながら、目標や状況に合わせて教材も柔軟に選びます。
              </p>
            </div>
          </li>
          <li>
            <div>
              <p>
                Support Point
                <span>03</span>
              </p>
            </div>
            <h3>進路サポート</h3>
            <div>
              <p>
                進路や志望校の選び方に迷ったときもご安心ください。<br />
                これまでの経験をもとに、一人ひとりに合った学校選びや受験方法を一緒に考えます。<br />
                <span class="change"
                  >入試に必要な各種書類の準備もサポートし、進学後の生活まで見据えて伴走します。</span
                >
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section id="consultant">
        <h2>共育コンサルタント</h2>
        <div>
          <article>
            <h3>山園杏佳</h3>
            <p>
              キズキプロ家庭教師（元：キズキ共育塾 大阪校）<br />
              共育コンサルタント
            </p>
            <p>
              様々な背景をお持ちの生徒さまへの指導経験を積んだ実績のある講師が<span>プロ家庭教師</span>として指導にあたりますので、<span
                >安心してお任せください。</span
              >
            </p>
          </article>
          <figure>
            <img
              src="https://kizuki.or.jp/wp/wp-content/uploads/2025/11/yamazono.webp"
              alt="キズキプロ家庭教師 共育コンサルタント 山園杏佳"
              loading="lazy"
              width="350"
              height="467"
            />
          </figure>
        </div>
      </section>

      <section id="teachers">
        <h2>プロ家庭教師</h2>
        <div>
          <ul>
            <li>
              <article>
                <div>プロ家庭教師</div>
                <figure>
                  <img
                    src="https://kizuki.or.jp/wp/wp-content/uploads/2025/10/d56cd58613f0cfe7466f2a8150d9ce5a.webp"
                    alt="キズキプロ家庭教師の花輪 航"
                    loading="lazy"
                    width="675"
                    height="675"
                  />
                </figure>
                <dl>
                  <div>
                    <dt>氏名</dt>
                    <dd>花輪 航</dd>
                  </div>
                  <div>
                    <dt>地域</dt>
                    <dd>大阪府</dd>
                  </div>
                  <div>
                    <dt>学歴</dt>
                    <dd>
                      東京大学 教育学部 教育心理学コース<br />
                      東京大学 大学院 教育学研究科 基礎教育学コース
                    </dd>
                  </div>
                  <div>
                    <dt>合格実績</dt>
                    <dd>
                      早稲田大学、近畿大学、関西大学、西大和学園高校、洛南高校、茨木高校
                    </dd>
                  </div>
                  <div>
                    <dt>指導実績</dt>
                    <dd>キズキ歴6年、キズキ担当生徒累計100名、現在延べ10名</dd>
                  </div>
                </dl>
              </article>
            </li>
            <li>
              <article>
                <div>プロ家庭教師</div>
                <figure>
                  <img
                    src="https://kizuki.or.jp/wp/wp-content/uploads/2025/10/6b44d288f500bffe66a2205137e578a1.webp"
                    alt="キズキプロ家庭教師の浦野 蒼葉"
                    loading="lazy"
                    width="675"
                    height="675"
                  />
                </figure>
                <dl>
                  <div>
                    <dt>氏名</dt>
                    <dd>浦野 蒼葉</dd>
                  </div>
                  <div>
                    <dt>地域</dt>
                    <dd>東京都</dd>
                  </div>
                  <div>
                    <dt>学歴</dt>
                    <dd>横浜国立大学 理工学部</dd>
                  </div>
                  <div>
                    <dt>合格実績</dt>
                    <dd>
                      北里大学（医学部）、東京工業大学、東京理科大学、筑波大学、横浜国立大学
                    </dd>
                  </div>
                  <div>
                    <dt>指導実績</dt>
                    <dd>キズキ歴6年、キズキ担当生徒累計70名、現在延べ15名</dd>
                  </div>
                </dl>
              </article>
            </li>
            <li>
              <article>
                <div>プロ家庭教師</div>
                <figure>
                  <img
                    src="https://kizuki.or.jp/wp/wp-content/uploads/2025/10/a5f39f8dadda24f686e88bea290b3eca.webp"
                    alt="キズキプロ家庭教師の加藤 藍"
                    loading="lazy"
                    width="675"
                    height="675"
                  />
                </figure>
                <dl>
                  <div>
                    <dt>氏名</dt>
                    <dd>加藤 藍</dd>
                  </div>
                  <div>
                    <dt>地域</dt>
                    <dd>東京都</dd>
                  </div>
                  <div>
                    <dt>学歴</dt>
                    <dd>宇都宮大学 教育学部</dd>
                  </div>
                  <div>
                    <dt>合格実績</dt>
                    <dd>（個別実績なし、指導実績に含む）</dd>
                  </div>
                  <div>
                    <dt>指導実績</dt>
                    <dd>キズキ担当生徒累計55名、現在延べ25名</dd>
                  </div>
                </dl>
              </article>
            </li>
            <li>
              <article>
                <div>プロ家庭教師</div>
                <figure>
                  <img
                    src="https://kizuki.or.jp/wp/wp-content/uploads/2025/10/cbce2970c1101761d4b05d1760c73f31.webp"
                    alt="キズキプロ家庭教師の篠田 雅仁"
                    loading="lazy"
                    width="675"
                    height="675"
                  />
                </figure>
                <dl>
                  <div>
                    <dt>氏名</dt>
                    <dd>篠田 雅仁</dd>
                  </div>
                  <div>
                    <dt>地域</dt>
                    <dd>神奈川県</dd>
                  </div>
                  <div>
                    <dt>学歴</dt>
                    <dd>早稲田大学法学部</dd>
                  </div>
                  <div>
                    <dt>合格実績</dt>
                    <dd>
                      立教大学、法政大学、翠嵐高校、青山学院附属横浜英和中学、佐久長聖中学
                    </dd>
                  </div>
                  <div>
                    <dt>指導実績</dt>
                    <dd>キズキ担当生徒累計30名、現在延べ10名</dd>
                  </div>
                </dl>
              </article>
            </li>
          </ul>
        </div>
      </section>

      <section id="area">
        <h2><span>対象地域</span></h2>
        <div>
          <p>
            主に以下のエリアへ派遣しております。<br />エリア外にお住まいの方も、<span
              class="nowrap"
              >まずはお気軽にお問い合わせください。</span
            >
          </p>
          <ul>
            <li>
              <h3>首都圏<span class="nowrap">エリア</span></h3>
            </li>
            <li>
              <h3>大阪近郊<span class="nowrap">エリア</span></h3>
            </li>
          </ul>
        </div>
      </section>

      <section id="voice">
        <h2>体験談</h2>
        <div>
          <ul>
            <li>
              <article>
                <blockquote>
                  基礎を重点的に進めることで、ゼロから中学卒業レベルの学力に到達！
                </blockquote>
                <h3>Aさん（中学3年生）</h3>
                <dl>
                  <div>
                    <dt>状況（相談時）</dt>
                    <dd><span>小学6年生から不登校</span></dd>
                  </div>
                  <div>
                    <dt>目標</dt>
                    <dd>
                      卒業後の進路は通信制高校に決めているが、
                      <span>中学3年間の基礎</span>を学びたい。
                    </dd>
                  </div>
                  <div>
                    <dt>悩み</dt>
                    <dd>集中力が続かない、学んだことをすぐに忘れてしまう。</dd>
                  </div>
                  <div>
                    <dt>キズキでの受講科目</dt>
                    <dd>週2で英語、数学、国語。</dd>
                  </div>
                  <div>
                    <dt>メンターサポート</dt>
                    <dd>自宅学習状況の確認。</dd>
                  </div>
                </dl>
              </article>
            </li>
            <li>
              <article>
                <blockquote>
                  特性に合わせた勉強方法で、半年間で模試の偏差値が10UP！
                </blockquote>
                <h3>Bさん（小学5年生）</h3>
                <dl>
                  <div>
                    <dt>状況（相談時）</dt>
                    <dd><span>３か月ほど前から行き渋り</span></dd>
                  </div>
                  <div>
                    <dt>目標</dt>
                    <dd><span>難関中学に進学</span>したい。</dd>
                  </div>
                  <div>
                    <dt>悩み</dt>
                    <dd>
                      拘りが強く納得できないと前に進めない、耳からの情報処理が苦手。
                    </dd>
                  </div>
                  <div>
                    <dt>キズキでの受講科目</dt>
                    <dd>週2で国語、算数、理科、社会。</dd>
                  </div>
                  <div>
                    <dt>メンターサポート</dt>
                    <dd>本人への声掛け（保護者様と）。</dd>
                  </div>
                </dl>
              </article>
            </li>
            <li>
              <article>
                <blockquote>
                  学習計画のサポートと「得意」に合わせた受験方法により、現役で志望大学に合格！
                </blockquote>
                <h3>Cさん（高校2年生）</h3>
                <dl>
                  <div>
                    <dt>状況（相談時）</dt>
                    <dd><span>中学1年生から不登校</span></dd>
                  </div>
                  <div>
                    <dt>目標</dt>
                    <dd>
                      <span>MARCH以上の大学</span>（学部未定）に進学したい。
                    </dd>
                  </div>
                  <div>
                    <dt>悩み</dt>
                    <dd>勉強を始めるまでに時間がかかる、暗記が苦手。</dd>
                  </div>
                  <div>
                    <dt>キズキでの受講科目</dt>
                    <dd>週3で英語、社会、国語。</dd>
                  </div>
                  <div>
                    <dt>メンターサポート</dt>
                    <dd>志望校や受験方法、授業以外の学習計画について相談。</dd>
                  </div>
                </dl>
              </article>
            </li>
          </ul>
        </div>
      </section>

      <section id="flow">
        <h2><span>授業実施までの流れ</span></h2>
        <div>
          <ol>
            <li>
              <div>
                <h3>
                  お問い合わせ<br />
                  (お電話/WEB)
                </h3>
              </div>
              <div
                class="flow-icon"
                style="
                  background-image: url('https://kizuki.or.jp/wp/wp-content/uploads/2025/11/icons-1.png');
                "
                role="img"
                aria-label="電話で問い合わせるアイコン"
              ></div>
              <p>
                共育コンサルタントからお電話をさせていただき、現状やお困りごとのヒアリングとサービスの詳細ご説明をいたします。
              </p>
            </li>
            <li>
              <div>
                <h3>
                  初回面談<br />
                  (ご訪問)
                </h3>
              </div>

              <div
                class="flow-icon"
                style="
                  background-image: url('https://kizuki.or.jp/wp/wp-content/uploads/2025/11/icons-2.png');
                "
                role="img"
                aria-label="初回面談のアイコン"
              ></div>
              <p>
                共育コンサルタントがご自宅に訪問し、授業の進め方をご相談いたします。
              </p>
            </li>
            <li>
              <div>
                <h3>指導計画書の作成</h3>
              </div>
              <div
                class="flow-icon"
                style="
                  background-image: url('https://kizuki.or.jp/wp/wp-content/uploads/2025/11/icons-3.png');
                "
                role="img"
                aria-label="計画書のアイコン"
              ></div>
              <p>
                面談にて合意頂いた内容とキズキでのノハウをもとに、お子さま個別の指導計画書を作成いたします。
              </p>
            </li>
            <li>
              <div>
                <h3>授業実施</h3>
              </div>
              <div
                class="flow-icon"
                style="
                  background-image: url('https://kizuki.or.jp/wp/wp-content/uploads/2025/11/icons-4.png');
                "
                role="img"
                aria-label="授業のアイコン"
              ></div>
              <p>
                指導計画書をもとに、目標達成に導くプロ/セレクト教師が授業を進めます。
              </p>
            </li>
          </ol>
        </div>
      </section>
    </main>

    <footer>
      <div>
        <a
          href="https://kizuki.or.jp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          キズキ共育塾へ
        </a>
      </div>
      <div>
        <p>
          <small>&copy;キズキプロ家庭教師. ALL rights reserved.</small>
        </p>
      </div>
    </footer>

    <aside role="complementary" aria-label="お問い合わせ">
      <a
        href="https://kizuki.or.jp/pro-tutor-contactform/"
        target="_blank"
        rel="noopener noreferrer"
      >
        入会相談
      </a>
      <a href="#">資料請求</a>
    </aside>
  </body>
</html>
