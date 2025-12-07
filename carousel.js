
document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------
 // ------------------------------
// Journey Carousel (<576px only, Infinite Loop + Swipe)
// ------------------------------
const journeyTrack = document.getElementById("journey-carousel");
const journeyPrev = document.getElementById("journey-prev");
const journeyNext = document.getElementById("journey-next");
const journeyCards = journeyTrack ? journeyTrack.querySelectorAll(".card") : [];

let journeyIndex = 0;

function updateJourneyCarousel() {
  if (!journeyTrack || journeyCards.length === 0) return;

  if (window.innerWidth >= 576) {
    journeyTrack.style.transform = "none";
    return;
  }

  const cardWidth = journeyCards[0].offsetWidth + 16;
  journeyTrack.style.transform = `translateX(-${journeyIndex * cardWidth}px)`;
}

// NEXT with looping
function nextJourney() {
  if (window.innerWidth >= 576) return;

  journeyIndex++;

  if (journeyIndex >= journeyCards.length) {
    journeyIndex = 0; // Loop back to first
  }

  updateJourneyCarousel();
}

// PREV with looping
function prevJourney() {
  if (window.innerWidth >= 576) return;

  journeyIndex--;

  if (journeyIndex < 0) {
    journeyIndex = journeyCards.length - 1; // Loop to last
  }

  updateJourneyCarousel();
}

if (journeyNext) {
  journeyNext.addEventListener("click", nextJourney);
}

if (journeyPrev) {
  journeyPrev.addEventListener("click", prevJourney);
}

window.addEventListener("resize", updateJourneyCarousel);
updateJourneyCarousel();


// ------------------------------
// Swipe Support
// ------------------------------
let startX = 0;
let endX = 0;

if (journeyTrack) {
  journeyTrack.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  journeyTrack.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
  });

  journeyTrack.addEventListener("touchend", () => {
    if (window.innerWidth >= 576) return;

    const delta = endX - startX;

    if (Math.abs(delta) > 50) {
      if (delta < 0) {
        nextJourney(); // Swipe left
      } else {
        prevJourney(); // Swipe right
      }
    }
  });
}


  // ------------------------------
  // Featured Carousel (<768px only)
  // ------------------------------
  const featuredTrack = document.querySelector(".featured-track");
  const featuredPrev = document.getElementById("featured-prev");
  const featuredNext = document.getElementById("featured-next");
  const featuredLogos = featuredTrack ? Array.from(featuredTrack.children) : [];

  let featuredIndex = 0;
  const featuredVisibleCount = 1;
  const autoSlideInterval = 2000; // 2s
  let autoSlideTimer = null;

  function updateFeaturedCarousel() {
    if (!featuredTrack || featuredLogos.length === 0) return;

    if (window.innerWidth >= 768) {
      featuredTrack.style.transform = "none";
      return;
    }

    const logoWidth = featuredLogos[0].offsetWidth + 32;
    featuredTrack.style.transform = `translateX(${-featuredIndex * logoWidth}px)`;
  }

  function nextFeaturedSlide() {
    if (window.innerWidth >= 768) return;
    if (featuredIndex < featuredLogos.length - featuredVisibleCount) {
      featuredIndex++;
    } else {
      featuredIndex = 0;
    }
    updateFeaturedCarousel();
  }

  function prevFeaturedSlide() {
    if (window.innerWidth >= 768) return;
    if (featuredIndex > 0) {
      featuredIndex--;
    } else {
      featuredIndex = featuredLogos.length - featuredVisibleCount;
    }
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
