// ユーザーの選択データを保持するオブジェクト
const userData = {
  type: "", // parent or student
  age: "",
  topic: "",
};

// STEP 1: 保護者か本人か
function nextStep(type) {
  userData.type = type;

  // UI更新
  document.getElementById("step1").classList.remove("active");
  document.getElementById("progressBar").style.width = "66%";

  if (type === "parent") {
    document.getElementById("step2-parent").classList.add("active");
  } else {
    document.getElementById("step2-student").classList.add("active");
  }
}

// STEP 2: 年代・属性
function setAgeAndNext(age, currentStepType) {
  userData.age = age;

  // UI更新
  if (currentStepType === "parent") {
    document.getElementById("step2-parent").classList.remove("active");
  } else {
    document.getElementById("step2-student").classList.remove("active");
  }

  document.getElementById("step3").classList.add("active");
  document.getElementById("progressBar").style.width = "100%";
}

// STEP 3: 相談内容選択 ＆ 完了処理
function finishSelection(topic) {
  userData.topic = topic;

  // ボタンをローディング表示などにする場合はここに記述

  console.log("選択データ:", userData); // デバッグ用

  // ★★★ ここでLPの遷移先を分岐させます ★★★
  const finalUrl = getDestinationUrl(userData);

  // 実際の遷移（テスト時はコメントアウトを外してください）
  // window.location.href = finalUrl;

  alert(
    `【デモ】以下の条件で遷移します。\n\n対象: ${userData.type}\n年代: ${userData.age}\n相談: ${userData.topic}\n\n遷移先URL: ${finalUrl}`
  );
}

// ▼▼▼ URL振り分けロジック設定エリア ▼▼▼
function getDestinationUrl(data) {
  // 基本URL（デフォルト）
  let url = "https://kizuki.or.jp/";

  // 例：条件分岐ロジック
  // ※実際の運用URLに合わせて書き換えてください

  // パターン1: 不登校の相談の場合
  if (data.topic === "不登校") {
    url = "https://kizuki.or.jp/lp/futoko/";
  }
  // パターン2: 社会人の学び直しの場合
  else if (data.topic === "学び直し" || data.age.includes("社会人")) {
    url = "https://kizuki.or.jp/lp/recurrent/";
  }
  // パターン3: 通信制高校生の場合
  else if (data.age.includes("通信制")) {
    url = "https://kizuki.or.jp/lp/correspondence/";
  }
  // その他
  else {
    url = "https://kizuki.or.jp/contact/";
  }

  return url;
}
