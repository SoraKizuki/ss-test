const guardianRadio = document.getElementById("guardian");
const selfRadio = document.getElementById("self");
const secondarySection = document.getElementById("secondarySection");
const juniorRadio = document.getElementById("junior");
const highRadio = document.getElementById("high");
const adultRadio = document.getElementById("adult");
const ctaButton = document.getElementById("ctaButton");

// プライマリラジオボタンのイベントリスナー
guardianRadio.addEventListener("change", updateDisplay);
selfRadio.addEventListener("change", updateDisplay);

// セカンダリラジオボタンのイベントリスナー
juniorRadio.addEventListener("change", updateDisplay);
highRadio.addEventListener("change", updateDisplay);
adultRadio.addEventListener("change", updateDisplay);

function updateDisplay() {
  // 本人が選択されたら二次選択を表示
  if (selfRadio.checked) {
    secondarySection.classList.add("show");
  } else {
    secondarySection.classList.remove("show");
    // 保護者を選んだら二次選択をクリア
    juniorRadio.checked = false;
    highRadio.checked = false;
    adultRadio.checked = false;
  }

  // ボタンの表示とリンク先の設定
  let targetUrl = "";
  let buttonText = "";

  if (guardianRadio.checked) {
    targetUrl = "#guardian-lp";
    buttonText = "保護者向けプランを見る →";
    ctaButton.classList.add("show");
  } else if (selfRadio.checked && juniorRadio.checked) {
    targetUrl = "#junior-lp";
    buttonText = "中学生向けプランを見る →";
    ctaButton.classList.add("show");
  } else if (selfRadio.checked && highRadio.checked) {
    targetUrl = "#high-lp";
    buttonText = "高校生向けプランを見る →";
    ctaButton.classList.add("show");
  } else if (selfRadio.checked && adultRadio.checked) {
    targetUrl = "#adult-lp";
    buttonText = "社会人向けプランを見る →";
    ctaButton.classList.add("show");
  } else {
    ctaButton.classList.remove("show");
  }

  if (targetUrl) {
    ctaButton.href = targetUrl;
    ctaButton.textContent = buttonText;
  }
}
