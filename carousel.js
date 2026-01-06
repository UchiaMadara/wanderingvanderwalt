document.addEventListener("DOMContentLoaded", () => {
  // ======================================================
  // JOURNEY CAROUSEL (<576px only, infinite loop + swipe)
  // ======================================================


const journeyTrack = document.getElementById("journey-carousel");
const journeyPrev = document.getElementById("journey-prev");
const journeyNext = document.getElementById("journey-next");
let currentOffset = 0;

if (journeyTrack) {
  const journeyCards = journeyTrack.querySelectorAll(".card");
  let journeyIndex = 0;

  function updateJourneyCarousel() {
    if (window.innerWidth >= 576) {
      journeyTrack.style.transform = "none";
      return;
    }

    const cardWidth = journeyCards[0].getBoundingClientRect().width;
    const gap = 16; // matches CSS margin (0.5rem * 2)
    const offset = journeyIndex * (cardWidth + gap);

    currentOffset = -offset;
    journeyTrack.style.transform = `translateX(${currentOffset}px)`;

  }

  function nextJourney() {
    if (window.innerWidth >= 576) return;
    journeyIndex = (journeyIndex + 1) % journeyCards.length;
    updateJourneyCarousel();
  }

  function prevJourney() {
    if (window.innerWidth >= 576) return;
    journeyIndex =
      (journeyIndex - 1 + journeyCards.length) % journeyCards.length;
    updateJourneyCarousel();
  }

  if (journeyNext) journeyNext.addEventListener("click", nextJourney);
  if (journeyPrev) journeyPrev.addEventListener("click", prevJourney);

  window.addEventListener("resize", updateJourneyCarousel);
  window.addEventListener("load", updateJourneyCarousel);
  updateJourneyCarousel();

  // ---------- iOS Direction-Locked Swipe ----------
let startX = 0;
let startY = 0;
let endX = 0;
let isDragging = false;
let lockDirection = null;

journeyTrack.addEventListener(
  "touchstart",
  (e) => {
    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
    endX = startX;
    lockDirection = null;
    isDragging = true;
  },
  { passive: true }
);

journeyTrack.addEventListener(
  "touchmove",
  (e) => {
    if (!isDragging) return;

    const t = e.touches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    endX = t.clientX;

    // Decide intent
    if (!lockDirection) {
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      lockDirection = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }

    // Allow vertical scroll
    if (lockDirection === "y") return;

    // Horizontal swipe
    e.preventDefault();
    journeyTrack.classList.add("is-swiping");

    // 🔥 THIS IS THE KEY LINE
    journeyTrack.style.transform = `translateX(${currentOffset + dx}px)`;
  },
  { passive: false }
);


function endSwipe() {
  journeyTrack.classList.remove("is-swiping");
  isDragging = false;

  if (lockDirection !== "x" || window.innerWidth >= 576) {
    journeyTrack.style.transform = `translateX(${currentOffset}px)`;
    return;
  }

  const delta = endX - startX;

  if (Math.abs(delta) > 50) {
    delta < 0 ? nextJourney() : prevJourney();
  } else {
    // 🔥 SNAP BACK if swipe was too small
    journeyTrack.style.transform = `translateX(${currentOffset}px)`;
  }
}
journeyTrack.addEventListener("touchend", endSwipe);
journeyTrack.addEventListener("touchcancel", endSwipe);



  // ======================================================
  // FEATURED CAROUSEL (<768px only, auto slide)
  // ======================================================

  const featuredTrack = document.querySelector(".featured-track");
  const featuredPrev = document.getElementById("featured-prev");
  const featuredNext = document.getElementById("featured-next");
  const featuredLogos = featuredTrack
    ? Array.from(featuredTrack.children)
    : [];

  let featuredIndex = 0;
  const featuredVisibleCount = 1;
  const autoSlideInterval = 2000;
  let autoSlideTimer = null;

  function updateFeaturedCarousel() {
    if (!featuredTrack || featuredLogos.length === 0) return;

    if (window.innerWidth >= 768) {
      featuredTrack.style.transform = "none";
      return;
    }

    const logoWidth = featuredLogos[0].offsetWidth + 32;
    featuredTrack.style.transform = `translateX(-${featuredIndex * logoWidth}px)`;
  }

  function nextFeaturedSlide() {
    if (window.innerWidth >= 768) return;
    featuredIndex =
      featuredIndex < featuredLogos.length - featuredVisibleCount
        ? featuredIndex + 1
        : 0;
    updateFeaturedCarousel();
  }

  function prevFeaturedSlide() {
    if (window.innerWidth >= 768) return;
    featuredIndex =
      featuredIndex > 0
        ? featuredIndex - 1
        : featuredLogos.length - featuredVisibleCount;
    updateFeaturedCarousel();
  }

  function startAutoSlide() {
    if (window.innerWidth < 768 && !autoSlideTimer) {
      autoSlideTimer = setInterval(nextFeaturedSlide, autoSlideInterval);
    }
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  if (featuredNext) featuredNext.addEventListener("click", nextFeaturedSlide);
  if (featuredPrev) featuredPrev.addEventListener("click", prevFeaturedSlide);

  startAutoSlide();

  window.addEventListener("resize", () => {
    stopAutoSlide();
    startAutoSlide();
    updateFeaturedCarousel();
  });
});
