let selection = {
  type: null,
  category: null,
};

// 質問1の選択肢
document.querySelectorAll("#question1 .option").forEach((option) => {
  option.addEventListener("click", function () {
    // 選択状態をリセット
    document.querySelectorAll("#question1 .option").forEach((opt) => {
      opt.classList.remove("selected");
    });

    this.classList.add("selected");
    selection.type = this.dataset.value;
    selection.category = null;

    // 結果セクションを非表示
    document.getElementById("result").classList.remove("visible");
    document.getElementById("result").classList.add("hidden");

    if (selection.type === "guardian") {
      // 保護者を選択した場合は質問2を非表示にして結果を表示
      document.getElementById("question2").classList.remove("visible");
      document.getElementById("question2").classList.add("hidden");
      showResult();
    } else {
      // 本人を選択した場合は質問2を表示
      document.getElementById("question2").classList.remove("hidden");
      document.getElementById("question2").classList.add("visible");
    }
  });
});

// 質問2の選択肢
document.querySelectorAll("#question2 .option").forEach((option) => {
  option.addEventListener("click", function () {
    // 選択状態をリセット
    document.querySelectorAll("#question2 .option").forEach((opt) => {
      opt.classList.remove("selected");
    });

    this.classList.add("selected");
    selection.category = this.dataset.value;
    showResult();
  });
});

//LPの遷移先
function showResult() {
  let url = "#";

  if (selection.type === "guardian") {
    url = "https://example.com/guardian-lp";
  } else if (selection.type === "self" && selection.category) {
    switch (selection.category) {
      case "junior":
        url = "https://example.com/junior-lp";
        break;
      case "high":
        url = "https://example.com/high-lp";
        break;
      case "adult":
        url = "https://example.com/adult-lp";
        break;
    }
  }

  if (url !== "#") {
    document.getElementById("resultLink").href = url;
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("result").classList.add("visible");
  }
}
