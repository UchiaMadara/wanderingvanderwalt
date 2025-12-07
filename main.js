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

// Toggle open/close when hamburger is clicked
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");

  const isOpen = navMenu.classList.contains("show");
  hamburger.innerHTML = isOpen ? "&times;" : "&#9776;";
  hamburger.setAttribute("aria-expanded", isOpen);
});

// Close menu when any link inside the nav is clicked
navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

// Close menu if clicking outside of menu + hamburger
document.addEventListener("click", (e) => {
  const clickedInsideMenu = navMenu.contains(e.target);
  const clickedHamburger = hamburger.contains(e.target);

  if (!clickedInsideMenu && !clickedHamburger) {
    closeMenu();
  }
});

// Function to close the menu
function closeMenu() {
  if (navMenu.classList.contains("show")) {
    navMenu.classList.remove("show");
    hamburger.innerHTML = "&#9776;";
    hamburger.setAttribute("aria-expanded", "false");
  }
}

  // Form handling 
  /*const form = document.getElementById("sib-form");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (typeof grecaptcha !== "undefined" && window.recaptchaWidgetId !== undefined) {
        grecaptcha.execute(window.recaptchaWidgetId);
      } else {
        console.error("reCAPTCHA not ready yet.");
      }
    });
  }*/
});

// === reCAPTCHA GLOBAL CALLBACKS ===
/*function onCaptchaSuccess(token) {
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
*/