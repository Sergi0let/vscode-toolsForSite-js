// провіряє чи сайт був відкритий на точ-скринні
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

const body = document.querySelector('body');

if (isMobile.any()) {
  // 1. Було відкрито на точСкріні то добаляємо класс _touch для body
  body.classList.add('_touch');
  // 3. Створюємо колекцію усіх стрілочок .arrow
  const arrows = document.querySelectorAll('.arrow');
  // 4. Проходимося циклом по стрілках
  for (const arrow of arrows) {
    // 5. thisLink це елемент головних заголовків
    const thisLink = arrow.previousElementSibling;
    // 6. subMenu це саме півменню
    const subMenu = arrow.nextElementSibling;
    const thisArrow = arrow;
    // parent додаємо клас через який в CSs ми робимо відступ від стрілочки коли вона зявится та точСкрінні
    thisLink.classList.add('parent');
    arrow.addEventListener('click', function () {
      // для відкриття півменню
      subMenu.classList.toggle('_open');
      // активна стрілка для перевороту через css
      thisArrow.classList.toggle('_activeArrow');
    });
  }
} else {
  // 2. Я на компютері то класс _pc.
  body.classList.add('_pc');
}
