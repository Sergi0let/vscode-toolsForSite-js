// CHECKBOX

const checkboxs = document.querySelectorAll('.checkbox');

for (const check of checkboxs) {
  const checkButton = check;
  const checkElement = check.firstElementChild;

  if (checkElement.hasAttribute('checked')) {
    checkButton.classList.add('activeBox');
  }
  checkButton.addEventListener('click', () => {
    checkButton.classList.toggle('activeBox');
  });
}
const radioButtons = document.querySelectorAll('input[type="radio"]');
for (let radio of radioButtons) {
  const parentRadio = radio.parentElement;
  radio.addEventListener('click', function () {
    if (radio.checked) {
      parentRadio.classList.toggle('activeRadio');
    }
  });
}
