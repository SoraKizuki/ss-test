(function () {
  "useD strict";
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
      splashScreen.style.display = "none";
    }, 2000);
  }
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
  const headerHeight = document.querySelector(".header").offsetHeight;
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
  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });
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
  setTimeout(function () {
    checkFade();
  }, 100);
  const accordionSummaries = document.querySelectorAll(".qa-accordion-summary");
  accordionSummaries.forEach(function (summary) {
    summary.addEventListener("click", function (e) {
      e.preventDefault();
      const details = this.closest(".qa-accordion-item");
      const content = details.querySelector(".qa-accordion-content");
      const isOpen = details.hasAttribute("open");
      if (isOpen) {
        content.style.display = "none";
        details.removeAttribute("open");
      } else {
        document
          .querySelectorAll(".qa-accordion-item[open]")
          .forEach(function (openDetails) {
            const openContent = openDetails.querySelector(
              ".qa-accordion-content"
            );
            openContent.style.display = "none";
            openDetails.removeAttribute("open");
          });
        details.setAttribute("open", "");
        content.style.display = "block";
      }
    });
  });
  const strengthSection = document.getElementById("strength");
  const strength03Card = document.querySelectorAll(
    ".strength-steps-list .step-card"
  )[2];
  const charaL = document.getElementById("scroll-chara-l");
  const charaR = document.getElementById("scroll-chara-r");
  function handleCharacterScroll() {
    if (!strengthSection || !strength03Card || !charaL || !charaR) {
      if (charaL) charaL.classList.remove("is-visible");
      if (charaR) charaR.classList.remove("is-visible");
      return;
    }
    const strengthRect = strengthSection.getBoundingClientRect();
    const strength03Rect = strength03Card.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const disappearanceTriggerPoint = windowHeight * 0.3;
    const isStrength03Visible =
      strength03Rect.top < windowHeight * 0.8 &&
      strength03Rect.bottom > disappearanceTriggerPoint;
    if (isStrength03Visible) {
      charaL.classList.add("is-visible");
    } else {
      charaL.classList.remove("is-visible");
    }
    const isStrengthAreaVisible =
      strengthRect.top < windowHeight * 0.8 &&
      strengthRect.bottom > disappearanceTriggerPoint;
    const isRightCharaTrulyVisible =
      isStrengthAreaVisible && !isStrength03Visible;
    if (isRightCharaTrulyVisible) {
      charaR.classList.add("is-visible");
    } else {
      charaR.classList.remove("is-visible");
    }
  }
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function () {
        handleCharacterScroll();
        scrollTimeout = null;
      }, 50);
    }
  });
  setTimeout(handleCharacterScroll, 100);
})();
