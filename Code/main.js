document.addEventListener("DOMContentLoaded", () => {
  // Accordion
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      header.parentElement.classList.toggle("active");
    });
  });

  // Hamburger Menu
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    const isOpen = navMenu.classList.contains("show");
    hamburger.innerHTML = isOpen ? "&times;" : "&#9776;";
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Form handling
  const form = document.getElementById("sib-form");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (typeof grecaptcha !== "undefined" && window.recaptchaWidgetId !== undefined) {
        grecaptcha.execute(window.recaptchaWidgetId);
      } else {
        console.error("reCAPTCHA not ready yet.");
      }
    });
  }
});

// === reCAPTCHA GLOBAL CALLBACKS ===
function onCaptchaSuccess(token) {
  const form = document.getElementById("sib-form");
  if (form) {
    let input = document.createElement("input");
    input.type = "hidden";
    input.name = "g-recaptcha-response";
    input.value = token;
    form.appendChild(input);
    form.submit();
  }
}

function onCaptchaExpired() {
  alert("Captcha expired. Please try again.");
}

function onCaptchaError() {
  alert("Captcha error. Please try again.");
}

// === reCAPTCHA INITIALIZATION ===
function onRecaptchaLoad() {
  const recaptchaContainer = document.getElementById("recaptcha-container");
  if (recaptchaContainer) {
    window.recaptchaWidgetId = grecaptcha.render(recaptchaContainer, {
      sitekey: "6Le-bcQrAAAAAJXklEdj1fw4zn4ebgX3KPEkf2Ip",
      size: "invisible",
      callback: onCaptchaSuccess,
      "expired-callback": onCaptchaExpired,
      "error-callback": onCaptchaError,
    });
  }
}
