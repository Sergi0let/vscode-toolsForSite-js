// Simple slider
/*
1. Пишемо слайдер фукцією яка може використовуватися багаторазово, при умові що верстка буде по шаблону.
2. initSimpleSlider(content, selector) selector - це індетифікатор слайдера.
3. З параметра selector шукаємо батька parent
4. З parent шукаємо сам елемет та кнопки.
5. Створюємо лічильник count який буде показувати порядок content
6.   elem.innerHTML = content[count] встановлюємо початкове значення.
7. next вішаємо оброботчик 
8. prev вішаємо оброботчик
9. Важливо встановити умови для лічильника щоб не отримати undefined
*/

initSimpleSlider(['Slider_1', 'Text_1', 'Text_3'], '#slider_one');
initSimpleSlider(['Slider_2', 'Text_1', 'Text_3'], '#slider_two');

function initSimpleSlider(content, selector) {
  const parent = document.querySelector(selector);
  const elem = parent.querySelector('.slider__content');
  const prev = parent.querySelector('.slider__next');
  const next = parent.querySelector('.slider__prev');
  let count = 0;

  elem.innerHTML = content[count];

  next.addEventListener('click', function () {
    count++;
    if (count === content.length) {
      count = 0;
    }
    elem.innerHTML = content[count];
  });

  prev.addEventListener('click', function () {
    count--;
    if (count === -1) {
      count = content.length - 1;
    }
    elem.innerHTML = content[count];
  });
}

//========================================================================================================================================================

initSimpleSliderTwo(['1', '2', '3', '4', '5'], '#slider_three');
function initSimpleSliderTwo(content, selector) {
  const parent = document.querySelector(selector);
  const elem = parent.querySelector('.slider__content');
  let count = 0;

  elem.innerHTML = content[count];

  window.setInterval(function () {
    elem.innerHTML = content[count];
    count++;
    if (count === content.length) count = 0;
  }, 1000);
}
