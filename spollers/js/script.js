'use strict';

//Spollers №1
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
  // Отримуємо звичайні слайдери №3
  const spollersRegular = Array.from(spollersArray).filter(
    (item) => !item.dataset.spollers.split(',')[0]
  );

  //Ініціалізація звичайних слайдерів №4
  if (spollersRegular.length > 0) {
    initSpollers(spollersRegular);
  }

  // Отримуємо МЕДІА слайдери №5
  const spollersMedia = Array.from(spollersArray).filter(
    (item) => item.dataset.spollers.split(',')[0]
  );

  //Ініціалізація МЕДІА слайдерів №6
  if (spollersMedia.length > 0) {
    const breakpointsArray = []; // в який запушив обєкт
    spollersMedia.forEach((item) => {
      const params = item.dataset.spollers; // записуємо параметри ("800,max" )
      const breakpoint = {}; // для наповнення
      const paramsArray = params.split(','); // із params створюємо масив ['800', 'max']
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });

    // Отримуємо унікальні брейкпоінти № 7
    let mediaQueries = breakpointsArray.map(function (item) {
      return (
        '(' +
        item.type +
        '-width: ' +
        item.value +
        'px),' +
        item.value +
        ',' +
        item.type
      );
    }); // ['(min-width: 650px), 650 , min', '(max-width: 800px), 800 , max']

    mediaQueries = mediaQueries.filter(
      (item, index, self) => self.indexOf(item) === index
    ); // отримуємо унікальні елементи

    // Пробігаємося по кожному брейкпоінту № 8
    mediaQueries.forEach((breapoint) => {
      const paramsArray = breapoint.split(','); //['(min-width: 650px)', ' 650 ', ' min']
      const mediaBreakpoint = paramsArray[1]; //  650
      const mediaType = paramsArray[2]; //  min
      const matchMedia = window.matchMedia(paramsArray[0]); // MediaQueryList {media: '(min-width: 650px)', matches: true, onchange: null}

      // Збираємо масив обєктів який відповідає даному брейкпоінту №9
      const spollersArray = breakpointsArray.filter(function (item) {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true;
        }
      });

      // Собитія №10
      matchMedia.addListener(function () {
        initSpollers(spollersArray, matchMedia);
      });
      initSpollers(spollersArray, matchMedia); // запускаємо функцію
    });
  }

  // Ініціалізація функції initSpollers() № 11
  function initSpollers(spollersArray, matchMedia = false) {
    spollersArray.forEach((spollersBlock) => {
      spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
      if (matchMedia.matches || !matchMedia) {
        spollersBlock.classList.add('_init'); // усій оболочці присвоюємо клас _init до якої навішуются усі CSS класи для спойлера
        initSpollerBody(spollersBlock); // для роботи з контентною частиною спойлера
        spollersBlock.addEventListener('click', setSpollerAction);
      } else {
        spollersBlock.classList.remove('_init');
        initSpollerBody(spollersBlock, false);
        spollersBlock.removeEventListener('click', setSpollerAction);
      }
    });
  }

  // Робота з контентом initSpollerBody() № 12
  function initSpollerBody(spollersBlock, hideSpollerBody = true) {
    const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
    if (spollerTitles.length > 0) {
      spollerTitles.forEach((spollerTitle) => {
        if (hideSpollerBody) {
          spollerTitle.removeAttribute('tabindex');
          if (!spollerTitle.classList.contains('_active')) {
            spollerTitle.nextElementSibling.hidden = true;
          }
        } else {
          spollerTitle.setAttribute('tabindex', '-1');
          spollerTitle.nextElementSibling.hidden = false;
        }
      });
    }
  }
  function setSpollerAction(e) {
    const el = e.target;
    if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
      const spollerTitle = el.hasAttribute('data-spoller')
        ? el
        : el.closest('[data-spoller]');
      const spollersBlock = spollerTitle.closest('[data-spollers]');
      const oneSpoller = spollersBlock.hasAttribute('data-one-spoller')
        ? true
        : false;
      if (!spollersBlock.querySelectorAll('._slide').length) {
        if (oneSpoller && !spollerTitle.classList.contains('_active')) {
          hideSpollersBody(spollersBlock);
        }
        spollerTitle.classList.toggle('_active');
        _slideToggle(spollerTitle.nextElementSibling, 500);
      }
      e.preventDefault();
    }
  }
  function hideSpollersBody(spollersBlock) {
    const spollerActiveTittle = spollersBlock.querySelector(
      '[data-spoller]._active'
    );
    if (spollerActiveTittle) {
      spollerActiveTittle.classList.remove('_active');
      _slideUp(spollerActiveTittle.nextElementSibling, 500);
    }
  }
}

/*
1. Отримуємо колекцію усіх спойлерів spollersArray з атрибутом [data-spollers].
2. Нам потрібно буде колекцію spollersArray поділити на масиви які не мають Медіа запросів і які мають.
3. Створюємо spollersRegular (звичайні слайдери), фільтруємо колекцію і забераємо елементи у яких немає параметрів в data-spollers.
4. Ініціалізація слайдерів initSpollers(), перед тим провірка  if (spollersRegular.length > 0) 
5. Створюємо spollersMedia() (МЕДІА слайдери), фільтруємо колекцію і забераємо елементи у яких немає параметрів в data-spollers="800,max"
6. Ініціалізація слайдерів spollersMedia(), перед тим провірка  if (spollersMedia.length > 0) 
7. Отримуємо унікальні брейкпоінти
8. Пробігаємося по кожному брейкпоінту 
9. Збираємо масив обєктів який відповідає даному брейкпоінту
10. Собитія яке буде працювати при досягненню умов брейкпоінту
11. Ініціалізація функції initSpollers()
12.  Робота з контентом initSpollerBody()
*/
/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.
Например:
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/
//========================================================================================================================================================
//SlideToggle
let _slideUp = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = true;
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
};
let _slideDown = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    if (target.hidden) {
      target.hidden = false;
    }
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};

//========================================================================================================================================================
