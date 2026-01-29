document.addEventListener("DOMContentLoaded", () => {
  const journeyTrack = document.getElementById("skills-carousel");
const journeyPrev = document.getElementById("journey-prev");
const journeyNext = document.getElementById("journey-next");

if (journeyTrack) {
  const journeyCards = journeyTrack.querySelectorAll(".card");
  let journeyIndex = 0;

function updateJourneyCarousel() {
  if (window.innerWidth >= 576) {
    journeyTrack.style.transform = "translateX(0)";
    return;
  }

  journeyTrack.style.transform = `translateX(-${journeyIndex * 100}%)`;
}

  function nextJourney() {
  if (window.innerWidth >= 576) return;

  journeyTrack.style.transition = "none";
  journeyTrack.offsetHeight; // force reflow

  journeyIndex = (journeyIndex + 1) % journeyCards.length;

  journeyTrack.style.transition = "transform 0.5s ease";
  updateJourneyCarousel();
}

function prevJourney() {
  if (window.innerWidth >= 576) return;

  journeyTrack.style.transition = "none";
  journeyTrack.offsetHeight;

  journeyIndex =
    (journeyIndex - 1 + journeyCards.length) % journeyCards.length;

  journeyTrack.style.transition = "transform 0.5s ease";
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
});