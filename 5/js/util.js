const generateRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayElement = (elements) => elements[generateRandomInteger(0, elements.length - 1)];

export {generateRandomInteger, getRandomArrayElement};
