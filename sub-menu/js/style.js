let isMobile = {
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
  body.classList.add('_touch');
  const arrows = document.querySelectorAll('.arrow');

  for (const arrow of arrows) {
    const thisLink = arrow.previousElementSibling;
    const subMenu = arrow.nextElementSibling;
    const thisArrow = arrow;
    thisLink.classList.add('parent');
    arrow.addEventListener('click', function () {
      subMenu.classList.toggle('_open');
      thisArrow.classList.toggle('_active');
    });
  }
} else {
  body.classList.add('_pc');
}
