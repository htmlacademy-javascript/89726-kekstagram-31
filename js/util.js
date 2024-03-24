const generateRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayElement = (elements) => elements[generateRandomInteger(0, elements.length - 1)];
function isEscKey(evt) {
  return evt.key === 'Escape' || evt.keyCode === 27;
}

export {generateRandomInteger, getRandomArrayElement, isEscKey};
