document.addEventListener("DOMContentLoaded", () => {
  // ======================================================
  // JOURNEY CAROUSEL (<576px only, infinite loop + swipe)
  // ======================================================

  // ======================================================
// JOURNEY CAROUSEL (<576px only, smooth iOS swipe FIXED)
// ======================================================

const journeyTrack = document.getElementById("journey-carousel");
const journeyPrev = document.getElementById("journey-prev");
const journeyNext = document.getElementById("journey-next");

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

    journeyTrack.style.transform = `translateX(-${offset}px)`;
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

  // ---------- iOS Swipe Support ----------
  let startX = 0;
  let endX = 0;

  journeyTrack.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      endX = startX;
      journeyTrack.classList.add("is-swiping");
    },
    { passive: true }
  );

  journeyTrack.addEventListener(
    "touchmove",
    (e) => {
      endX = e.touches[0].clientX;
      e.preventDefault(); // IMPORTANT: stop page scroll on iOS
    },
    { passive: false }
  );

  journeyTrack.addEventListener("touchend", () => {
    journeyTrack.classList.remove("is-swiping");

    if (window.innerWidth >= 576) return;

    const delta = endX - startX;
    if (Math.abs(delta) > 50) {
      delta < 0 ? nextJourney() : prevJourney();
    }
  });
}

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
