document.addEventListener("DOMContentLoaded", () => {
  // ======================================================
  // JOURNEY CAROUSEL (<576px only, infinite loop + swipe)
  // ======================================================

  const journeyTrack = document.getElementById("journey-carousel");
  const journeyPrev = document.getElementById("journey-prev");
  const journeyNext = document.getElementById("journey-next");
  const journeyCards = journeyTrack
    ? journeyTrack.querySelectorAll(".card")
    : [];

  let journeyIndex = 0;

  function updateJourneyCarousel() {
    if (!journeyTrack || journeyCards.length === 0) return;

    if (window.innerWidth >= 576) {
      journeyTrack.style.transform = "none";
      return;
    }

    const card = journeyCards[journeyIndex];
    const container = journeyTrack.parentElement;

    const cardCenter =
      card.offsetLeft + card.offsetWidth / 2;

    const containerCenter =
      container.clientWidth / 2;

    const offset = cardCenter - containerCenter;

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

  // ------------------------------
  // Swipe Support (iOS SAFE)
  // ------------------------------
  let startX = 0;
  let endX = 0;

  if (journeyTrack) {
    journeyTrack.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      endX = startX; // ✅ required for iOS
    });

    journeyTrack.addEventListener("touchmove", (e) => {
      endX = e.touches[0].clientX;
    });

    journeyTrack.addEventListener("touchend", () => {
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
