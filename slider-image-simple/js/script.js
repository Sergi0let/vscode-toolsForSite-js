'use strict';
const arrImage = ['1.png', '2.png', '3.png', '4.png'];
let slider = document.querySelector('.slider');
let img = slider.querySelector('img');
let count = 0;

img.src = 'img/' + arrImage[0];

window.setInterval(function () {
  img.src = 'img/' + arrImage[count];
  count++;
  if (count === arrImage.length) count = 0;
}, 1000);
