const subscribeBtn = document.getElementById('subscribe-btn');
const captchaContainer = document.getElementById('captcha-container');

subscribeBtn.addEventListener('click', () => {
  const form = document.getElementById('sib-form');
  const inputs = form.querySelectorAll('input[required]');

  for (let input of inputs) {
    if (!input.value) {
      input.reportValidity();
      return;
    }
  }

  // Show CAPTCHA if validation passes
  captchaContainer.style.display = 'block';
  captchaContainer.scrollIntoView({ behavior: 'smooth' });
});

function onCaptchaSuccess(token) {
  document.getElementById('sib-form').submit();
}

function onCaptchaExpired() {
  alert('CAPTCHA expired. Please try again.');
}
