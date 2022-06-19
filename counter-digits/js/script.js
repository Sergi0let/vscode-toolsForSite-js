'use strict';

window.addEventListener('load', windowLoad);

function windowLoad() {
  // Функція ініціалізації
  function digitsCounterInit(digitsCounterItems) {
    let digitsCounters = digitsCounterItems
      ? digitsCounterItems
      : document.querySelectorAll('[data-digits-counter]');

    if (digitsCounters.length) {
      digitsCounters.forEach((digitsCounter) => {
        digitsCountersAnimate(digitsCounter);
      });
    }
  }

  // Функція анімації
  function digitsCountersAnimate(digitsCounter) {
    let startTimestamp = null;
    const duration = parseInt(digitsCounter.dataset.digitsCounter)
      ? parseInt(digitsCounter.dataset.digitsCounter)
      : 10000;
    const startValue = parseInt(digitsCounter.innerHTML);
    const startPosition = 0;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      digitsCounter.innerHTML = Math.floor(
        progress * (startPosition + startValue)
      );
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  // ПУСК при загрузці
  // digitsCounterInit();

  // ПУСК при скроллі (появі блока з лічильника)
  let options = {
    threshold: 0.3,
  };

  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetElement = entry.target;
        const digitsCounterItems = targetElement.querySelectorAll(
          '[data-digits-counter]'
        );
        if (digitsCounterItems.length) {
          digitsCounterInit(digitsCounterItems);
        }
        // Вимкнути відслідковування після спрацьовування
        observer.unobserve(targetElement);
      }
    });
  }, options);

  let sections = document.querySelectorAll('.page__section');
  if (sections.length) {
    sections.forEach((section) => {
      observer.observe(section);
    });
  }
}
