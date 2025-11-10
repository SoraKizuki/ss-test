(function () {
  "use strict";

  // --- 1. スプラッシュ画面とパーティクルアニメーション ---

  function createParticles() {
    const particleContainer = document.querySelector(".splash-particles");
    if (!particleContainer) return;
    const particleCount = 70;
    const maxSpread = Math.max(window.innerWidth, window.innerHeight) * 1.5;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * maxSpread;
      const tx = Math.cos(angle) * radius + "px";
      const ty = Math.sin(angle) * radius + "px";

      const delay = Math.random() * 0.4 + "s";
      const duration = Math.random() * 0.5 + 0.8 + "s";

      particle.style.setProperty("--tx", tx);
      particle.style.setProperty("--ty", ty);
      particle.style.animationDelay = delay;
      particle.style.animationDuration = duration;

      particleContainer.appendChild(particle);
    }
  }

  const splashScreen = document.getElementById("splash-screen");
  if (splashScreen) {
    function wrapCharacters(element, baseDelay) {
      const text = element.textContent;
      const chars = text.split("");
      let delay = baseDelay;

      const wrappedHtml = chars
        .map(function (char) {
          if (char === " ") {
            return " ";
          }
          const charSpan = `<span style="animation-delay: ${delay}s">${char}</span>`;
          delay += 0.03;
          return charSpan;
        })
        .join("");

      element.innerHTML = wrappedHtml;
      return delay;
    }

    setTimeout(createParticles, 400);

    const lines = document.querySelectorAll(".splash-content p");
    let lineDelay = 0.1;
    if (lines.length > 0) {
      lineDelay = wrapCharacters(lines[0], lineDelay);
      if (lines.length > 1) {
        lineDelay += 0.1;
        wrapCharacters(lines[1], lineDelay);
      }
    }

    setTimeout(function () {
      splashScreen.classList.add("is-hidden");
    }, 1500);

    setTimeout(function () {
      splashScreen.remove();
    }, 2300);
  }

  // --- 2. ハンバーガーメニューとSPナビゲーション ---

  const hamburgerBtn = document.getElementById("hamburger-btn");
  const spNav = document.getElementById("sp-nav");
  const spNavLinks = document.querySelectorAll(".sp-nav-link");

  if (hamburgerBtn && spNav) {
    hamburgerBtn.addEventListener("click", function () {
      const isOpen = this.classList.toggle("is-active");
      this.setAttribute("aria-expanded", isOpen);
      document.body.classList.toggle("nav-open");

      spNav.classList.toggle("is-open", isOpen);
    });

    spNavLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        hamburgerBtn.classList.remove("is-active");
        hamburgerBtn.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
        spNav.classList.remove("is-open");
      });
    });
  }

  // --- 3. スムーズスクロールとバックトゥトップ ---

  const header = document.querySelector(".header");
  const headerHeight = header ? header.offsetHeight : 0;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href === "#" || href === "#top") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const targetPosition = target.offsetTop - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });

  // Back to Top ボタンの表示/非表示
  const backToTop = document.getElementById("back-to-top");

  // 固定CTAバーの表示/非表示
  const fixedCtaBar = document.getElementById("fixed-cta-bar");

  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;

    // Back to Top の制御
    if (backToTop) {
      if (scrollY > 300) {
        backToTop.style.display = "block";
      } else {
        backToTop.style.display = "none";
      }
    }

    // 固定CTAバーの制御 (モバイル時のみ、かつ一定量スクロール後に表示)
    if (fixedCtaBar && window.innerWidth < 768) {
      if (scrollY > 400) {
        /* 400pxスクロールしたら表示 */
        fixedCtaBar.classList.add("is-visible");
      } else {
        fixedCtaBar.classList.remove("is-visible");
      }
    }

    // スクロールフェードのチェック (パフォーマンスを考慮し、スクロールハンドラ内に入れる)
    checkFade();
  });

  // --- 4. スクロールフェードインアニメーション ---

  const fadeElements = document.querySelectorAll(".section-fade");
  const windowHeight = window.innerHeight;

  function checkFade() {
    const scrollTop = window.scrollY;

    fadeElements.forEach(function (el) {
      const elTop = el.getBoundingClientRect().top + scrollTop;
      if (scrollTop > elTop - windowHeight * 0.8) {
        el.classList.add("is-visible");
      }
    });
  }

  // 初回実行を保証するため、少し遅延させる
  setTimeout(checkFade, 100);

  // --- 5. Q&Aアコーディオンの処理 ---

  const accordionSummaries = document.querySelectorAll(".qa-accordion-summary");

  accordionSummaries.forEach(function (summary) {
    summary.addEventListener("click", function () {
      const details = this.closest(".qa-accordion-item");
      const isOpen = details.hasAttribute("open");

      // 開こうとしているとき（isOpenがfalse）、他のdetailsを閉じる
      if (!isOpen) {
        document
          .querySelectorAll(".qa-accordion-item[open]")
          .forEach(function (openDetails) {
            if (openDetails !== details) {
              openDetails.removeAttribute("open");
              openDetails
                .querySelector(".qa-accordion-summary")
                .setAttribute("aria-expanded", "false");
            }
          });
        this.setAttribute("aria-expanded", "true");
      } else {
        this.setAttribute("aria-expanded", "false");
      }
    });
  });
})();
