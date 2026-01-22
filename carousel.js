document.addEventListener("DOMContentLoaded", () => {
  
// JOURNEY CAROUSEL (<576px only, IOS button click)

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

  const firstCard = journeyCards[0];
  const targetCard = journeyCards[journeyIndex];

  if (!firstCard || !targetCard) return;

  const trackRect = journeyTrack.getBoundingClientRect();
  const cardRect = targetCard.getBoundingClientRect();

  const offset = cardRect.left - trackRect.left;

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

  }
/*
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
  */


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

  const targetLogo = featuredLogos[featuredIndex];
  if (!targetLogo) return;

  const trackRect = featuredTrack.getBoundingClientRect();
  const logoRect = targetLogo.getBoundingClientRect();

  const offset = logoRect.left - trackRect.left;
  featuredTrack.style.transform = `translateX(-${offset}px)`;
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
