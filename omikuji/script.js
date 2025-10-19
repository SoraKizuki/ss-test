document.addEventListener("DOMContentLoaded", () => {
  const drawButton = document.getElementById("draw-button");
  const boxImage = document.getElementById("box-image");
  const resultArea = document.getElementById("result-area");
  const kekaText = document.getElementById("keka");
  const commentText = document.getElementById("comment");
  const bearImage = document.getElementById("bear-image");

  // おみくじの結果データ (確率とコメント)
  const omikujiData = [
    {
      keka: "大吉",
      weight: 10,
      comments: [
        "最高の運勢です！何事も積極的に挑戦しましょう。",
        "努力が実を結ぶ、実りの多い一年になるでしょう。",
        "幸運が舞い込む予感。自信を持って進みなさい。",
      ],
    },
    {
      keka: "中吉",
      weight: 20,
      comments: [
        "吉凶混合ですが、努力次第で良い結果が得られます。",
        "願いは叶いますが、少し時間がかかるかもしれません。",
        "現状維持で安定。欲張りすぎは禁物です。",
      ],
    },
    {
      keka: "小吉",
      weight: 25,
      comments: [
        "まずまずの運勢です。焦らず着実に進めましょう。",
        "小さな幸せを見つけられる日。感謝を忘れずに。",
        "日々の行いが運を開きます。",
      ],
    },
    {
      keka: "吉",
      weight: 15,
      comments: [
        "平均的な運勢です。平凡な中に喜びがあります。",
        "特筆すべきことはありませんが、平穏無事です。",
        "今の生活を大切に。",
      ],
    },
    {
      keka: "末吉",
      weight: 15,
      comments: [
        "これから運気が上昇します。今は耐え時です。",
        "少し注意が必要。謙虚な姿勢を心がけてください。",
        "油断せず、着実に準備を進めましょう。",
      ],
    },
    {
      keka: "凶",
      weight: 10,
      comments: [
        "注意が必要な運勢です。慎重に行動しましょう。",
        "困難に直面するかもしれませんが、学びの機会です。",
        "焦らず、一歩ずつ進むことが大切です。",
      ],
    },
    {
      keka: "大凶",
      weight: 5,
      comments: [
        "最も注意すべき運勢です。今日は静かに過ごしましょう。",
        "災いを避けるため、軽率な行動は避けてください。",
        "悪いことが続いても、明日は良くなると信じましょう。",
      ],
    },
  ];

  /**
   * 確率に基づいておみくじの結果を抽選する関数
   * @returns {Object} 抽選された結果データ
   */
  function drawOmikuji() {
    const totalWeight = omikujiData.reduce((sum, item) => sum + item.weight, 0);
    let rand = Math.random() * totalWeight;

    for (const item of omikujiData) {
      if (rand < item.weight) {
        const randomComment =
          item.comments[Math.floor(Math.random() * item.comments.length)];
        return { keka: item.keka, comment: randomComment };
      }
      rand -= item.weight;
    }
  }

  /**
   * 結果を表示する関数
   */
  function showResult(result) {
    // 結果の反映
    kekaText.textContent = result.keka;
    commentText.textContent = result.comment;

    // クマの画像を結果表情に差し替え
    bearImage.src = "img/omikuji-result.png";

    // 結果に応じてCSSクラスを付与
    if (result.keka === "大吉") {
      kekaText.classList.add("great-luck");
    } else if (result.keka === "大凶") {
      kekaText.classList.add("bad-luck");
    }

    // 結果エリアを表示
    resultArea.classList.remove("hidden");
  }

  /**
   * 初期状態にリセットする関数
   */
  function resetState() {
    bearImage.src = "img/omikuji-kuma.png";
    resultArea.classList.add("hidden");
    kekaText.className = "keka-text";
  }

  /**
   * おみくじを引くメイン処理
   */
  function handleDraw() {
    // ボタンを無効化
    drawButton.disabled = true;

    // 初期状態にリセット
    resetState();

    // シェイクアニメーションを開始
    boxImage.classList.add("shaking");

    // アニメーション完了後に結果を表示
    const handleAnimationEnd = () => {
      // イベントリスナーを削除（複数回実行防止）
      boxImage.removeEventListener("animationend", handleAnimationEnd);

      // シェイククラスを削除
      boxImage.classList.remove("shaking");

      // 抽選して結果を表示
      const result = drawOmikuji();
      showResult(result);

      // ボタンを再び有効化
      drawButton.disabled = false;
    };

    boxImage.addEventListener("animationend", handleAnimationEnd);
  }

  // イベントリスナー設定
  drawButton.addEventListener("click", handleDraw);
});
