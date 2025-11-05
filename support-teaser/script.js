(function () {
  "use strict";

  // ハンバーガーメニュー
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const spNav = document.getElementById("sp-nav");
  const spNavLinks = document.querySelectorAll(".sp-nav-link");

  hamburgerBtn.addEventListener("click", function () {
    this.classList.toggle("is-active");
    document.body.classList.toggle("nav-open");

    if (spNav.classList.contains("is-open")) {
      spNav.classList.remove("is-open");
      setTimeout(function () {
        if (!spNav.classList.contains("is-open")) {
          spNav.style.display = "none";
        }
      }, 400);
    } else {
      spNav.style.display = "block";
      setTimeout(function () {
        spNav.classList.add("is-open");
      }, 10);
    }
  });

  // SPナビリンククリック時
  spNavLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      hamburgerBtn.classList.remove("is-active");
      document.body.classList.remove("nav-open");
      spNav.classList.remove("is-open");
      setTimeout(function () {
        spNav.style.display = "none";
      }, 400);
    });
  });

  // スムーススクロール
  const headerHeight = document.querySelector(".header").offsetHeight;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href === "#" || href === "#top") {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const targetPosition = target.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // トップへ戻るボタン
  const backToTop = document.getElementById("back-to-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });

  // フェードインアニメーション
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

  window.addEventListener("scroll", checkFade);

  // 初回ロード時
  setTimeout(function () {
    checkFade();
  }, 100);

  // Q&Aアコーディオン
  const accordionSummaries = document.querySelectorAll(".qa-accordion-summary");

  accordionSummaries.forEach(function (summary) {
    summary.addEventListener("click", function (e) {
      e.preventDefault();

      const details = this.closest(".qa-accordion-item");
      const content = details.querySelector(".qa-accordion-content");
      const isOpen = details.hasAttribute("open");

      if (isOpen) {
        // 閉じる
        content.style.display = "none";
        details.removeAttribute("open");
      } else {
        // 他のアコーディオンを閉じる
        document
          .querySelectorAll(".qa-accordion-item[open]")
          .forEach(function (openDetails) {
            const openContent = openDetails.querySelector(
              ".qa-accordion-content"
            );
            openContent.style.display = "none";
            openDetails.removeAttribute("open");
          });

        // 開く
        details.setAttribute("open", "");
        content.style.display = "block";
      }
    });
  });
})();
