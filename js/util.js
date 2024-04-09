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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}


export {generateRandomInteger, getRandomArrayElement, isEscKey, showAlert, shuffleArray, debounce};
