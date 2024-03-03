const PHOTO_COUNT = 25;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Алексей',
  'Борис',
  'Наталья',
  'Гарсия',
  'Джулия'
];

const generateRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArrayElement = (elements) => elements[generateRandomInteger(0, elements.length - 1)];

const generateRandomId = (maxCount) => {
  const usedValues = [];
  let currentValue = generateRandomInteger(1, maxCount);
  if (usedValues.length >= PHOTO_COUNT) {
    return null;
  }
  while (usedValues. includes(currentValue)) {
    currentValue = generateRandomInteger(1, maxCount);
  }
  usedValues.push(currentValue);
  return currentValue;
};

const generatePhotoId = () => generateRandomId(PHOTO_COUNT);

const generateCommentId = () => generateRandomId(1000);

const generateUrl = () => {
  const maxCount = 25;
  const usedValues = [];
  let currentValue = generateRandomInteger(1, maxCount);
  if (usedValues.length >= PHOTO_COUNT) {
    return null;
  }
  while (usedValues. includes(currentValue)) {
    currentValue = generateRandomInteger(1, maxCount);
  }
  usedValues.push(currentValue);
  return `photos/${ currentValue }.jpg`;
};

const generateAvatar = () => {
  const maxCount = 6;
  const usedValues = [];
  let currentValue = generateRandomInteger(1, maxCount);
  if (usedValues.length >= maxCount) {
    return null;
  }
  while (usedValues. includes(currentValue)) {
    currentValue = generateRandomInteger(1, maxCount);
  }
  usedValues.push(currentValue);
  return `img/avatar-${ currentValue }.svg`;
};

const generateNewComment = () => ({
  id: generateCommentId(),
  avatar: generateAvatar(),
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const generateCommentList = (commentCount) => {
  const comments = [];
  for (let count = 0; count < commentCount; count++) {
    comments.push(generateNewComment());
  }
  return comments;
};

const generateNewPhoto = () => ({
  id: generatePhotoId(),
  url: generateUrl(),
  description: 'Yet another photo',
  likes: generateRandomInteger(15, 200),
  comments: generateCommentList(generateRandomInteger(0, 30))
});

const photos = Array.from({length: PHOTO_COUNT}, generateNewPhoto);
