// 設定項目 (編集可)
const questions = [
  {
    question: "講師はどのように選びたいですか？",
    choices: [
      "まずは相性を見るため提案してほしい",
      "希望の条件（経歴など）を指定したい",
    ],
    types: ["STANDARD", "SELECT"],
  },
  {
    question: "学習の目標について教えてください",
    choices: ["基礎固めや学び直しが中心", "難関大学受験を視野に入れている"],
    types: ["NORMAL_LEVEL", "PRO_LEVEL"],
  },
  {
    question: "特にプロ講師に指導を希望しますか？",
    choices: [
      "はい、経験豊富なプロにお願いしたい",
      "いいえ、特にこだわりはない",
    ],
    types: ["PRO_LEVEL", "NORMAL_LEVEL"],
  },
  {
    question: "医学部や最難関国公立大学を具体的に目指していますか？",
    choices: ["はい、目指しています", "いいえ、そこまでは考えていない"],
    types: ["PRO_SELECT_BOOST", null],
  },
  {
    question:
      "授業とは別に、学習計画や進路について相談できるサポートに興味はありますか？",
    choices: ["はい、ぜひ利用したい", "いいえ、今のところ必要ない"],
    types: ["MENTOR_OPTION", null],
  },
];

// 診断結果リスト (4コース × オプション)
const results = {
  STANDARD: {
    withoutOption: {
      title: "① スタンダードコース",
      description:
        "入会アセスメントの内容に合わせて、あなたにぴったりの講師を提案します。本格的な学習に入る前の準備としてもご利用いただけます。",
      link: "https://example.com/standard",
    },
    withOption: {
      title: "① スタンダードコース + メンターサポート",
      description:
        "あなたにぴったりの講師を提案する「スタンダードコース」に、キャリア・学習習慣・進路・自習の計画などを授業外で相談できる「メンターサポート」が付属します。",
      link: "https://example.com/standard-mentor",
    },
  },
  SELECT: {
    withoutOption: {
      title: "② セレクトコース",
      description:
        "講師の属性を事前にご指定できるコースです。ご希望の属性に合わせて、「学び直し」から「受験指導」まで、目的にあった講師を選抜いたします。",
      link: "https://example.com/select",
    },
    withOption: {
      title: "② セレクトコース + メンターサポート",
      description:
        "講師の属性を指定できる「セレクトコース」に、キャリア・学習習慣・進路・自習の計画などを授業外で相談できる「メンターサポート」が付属します。",
      link: "https://example.com/select-mentor",
    },
  },
  PRO_STANDARD: {
    withoutOption: {
      title: "③ プロスタンダードコース",
      description:
        "指導経験豊富なプロ講師が担当するコースです。基礎的な学習からスタートして、難関校を目指す方におすすめです。",
      link: "https://example.com/pro-standard",
    },
    withOption: {
      title: "③ プロスタンダードコース + メンターサポート",
      description:
        "指導経験豊富なプロ講師が担当する「プロスタンダードコース」に、キャリア・学習習慣・進路・自習の計画などを授業外で相談できる「メンターサポート」が付属します。",
      link: "https://example.com/pro-standard-mentor",
    },
  },
  PRO_SELECT: {
    withoutOption: {
      title: "④ プロセレクトコース",
      description:
        "医学部・国公立大学などの難関大学を目指す方向けのコースです。担当するのは「特性×学び」に特化した専門講師です。",
      link: "https://example.com/pro-select",
    },
    withOption: {
      title: "④ プロセレクトコース + メンターサポート",
      description:
        "最難関大学を目指す「プロセレクトコース」に、キャリア・学習習慣・進路・自習の計画などを授業外で相談できる「メンターサポート」が付属します。",
      link: "https://example.com/pro-select-mentor",
    },
  },
};

// ゲームロジック（編集不要）
// HTML 要素取得
const progressText = document.getElementById("progress");
const questionText = document.getElementById("question");
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameContainer = document.getElementById("game-container");
const resultContainer = document.getElementById("result-container");

let currentQuestionIndex = 0;
// 各コースタイプのスコア
const scores = {
  STANDARD: 0,
  SELECT: 0,
  PRO_STANDARD: 0,
  PRO_SELECT: 0,
};
let isMentorSupportEnabled = false;
const totalQuestions = questions.length;

// 問題を表示する関数
function showQuestion() {
  const question = questions[currentQuestionIndex];
  progressText.textContent = `第${
    currentQuestionIndex + 1
  }問 / 全${totalQuestions}問`;
  questionText.textContent = question.question;
  choiceButtons.forEach((button, index) => {
    button.textContent = question.choices[index];
    button.onclick = () => selectAnswer(question.types[index]);
  });
}

// 回答を選択したときの処理
function selectAnswer(type) {
  // 選択に応じてスコア更新
  switch (type) {
    case "STANDARD":
      scores.STANDARD++;
      scores.PRO_STANDARD++;
      break;
    case "SELECT":
      scores.SELECT++;
      scores.PRO_SELECT++;
      break;
    case "NORMAL_LEVEL":
      scores.STANDARD++;
      scores.SELECT++;
      break;
    case "PRO_LEVEL":
      scores.PRO_STANDARD++;
      scores.PRO_SELECT++;
      break;
    case "PRO_SELECT_BOOST":
      scores.PRO_SELECT += 2; // 重みづけ
      break;
    case "MENTOR_OPTION":
      isMentorSupportEnabled = true;
      break;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < totalQuestions) {
    showQuestion();
  } else {
    showResult();
  }
}

// 結果を表示する関数
function showResult() {
  // 最もスコアが高いコースタイプを決定する
  let maxScore = -1;
  let resultType = "STANDARD"; // デフォルト
  for (const type in scores) {
    if (scores[type] > maxScore) {
      maxScore = scores[type];
      resultType = type;
    }
  }

  // オプションの有無に応じて、最終的な結果キーを決定
  const finalResultKey = isMentorSupportEnabled
    ? "withOption"
    : "withoutOption";
  const result = results[resultType][finalResultKey];

  // 結果をHTMLに反映
  document.getElementById("result-title").textContent = result.title;
  document.getElementById("result-description").textContent =
    result.description;
  // result.link は外部参照だが、ここでは同ウィンドウでトップへ戻す
  const resultLinkEl = document.getElementById("result-link");
  if (resultLinkEl) {
    resultLinkEl.href = "../index.html";
    resultLinkEl.dataset.externalLink = result.link || "";
  }

  // ゲーム画面を非表示にし、結果画面を表示
  gameContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
}

// ゲーム開始
showQuestion();
