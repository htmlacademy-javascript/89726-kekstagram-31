const ALERT_SHOW_TIME = 5000;
const DELAY_TIMEOUT = 500;

const isEscKey = (evt) => evt.key === 'Escape' || evt.keyCode === 27;

const showAlert = (message) => {
  const errorTemplate = document.querySelector('#data-error').content.firstElementChild;
  const alertContainer = errorTemplate.cloneNode(true);
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const debounce = (callback, timeoutDelay = DELAY_TIMEOUT) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscKey, showAlert, shuffleArray, debounce};
