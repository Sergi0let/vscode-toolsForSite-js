// CHECKBOX

const checkboxs = document.querySelectorAll('[type="checkbox"]');

for (const check of checkboxs) {
  const checkButton = check;
  const parentElement = checkButton.parentElement;
  console.log(parentElement);

  if (checkButton.hasAttribute('checked')) {
    parentElement.classList.add('activeBox');
  }
  checkButton.addEventListener('click', () => {
    parentElement.classList.toggle('activeBox');
  });
}
console.log(checkboxs);
