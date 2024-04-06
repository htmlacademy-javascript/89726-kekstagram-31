const ALERT_SHOW_TIME = 5000;

const generateRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayElement = (elements) => elements[generateRandomInteger(0, elements.length - 1)];
function isEscKey(evt) {
  return evt.key === 'Escape' || evt.keyCode === 27;
}

const showAlert = (message) => {
  const errorTemplate = document.querySelector('#data-error').content.firstElementChild;
  const alertContainer = errorTemplate.cloneNode(true);
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {generateRandomInteger, getRandomArrayElement, isEscKey, showAlert};
