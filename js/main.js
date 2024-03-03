const PHOTO_COUNT = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const MIN_COMMENT_ID_COUNT = 0;
const MAX_COMMENT_ID_COUNT = 30;
const MAX_COMMENT_COUNT = 1000;
const MAX_AVATAR_COUNT = 6;
const MAX_URL_ID_COUNT = 25;

const DESCRIPTIONS = [
  'Ах, какой рассвет!',
  'На вечеринке с друзьями',
  'Всей семьей гоняли на природу',
  'Как же похорошела Рязань!',
  'Yet another photo'
];

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

const generateCommentId = () => generateRandomId(MAX_COMMENT_COUNT);

const generateUrl = () => {
  const usedValues = [];
  let currentValue = generateRandomInteger(1, MAX_URL_ID_COUNT);
  if (usedValues.length >= PHOTO_COUNT) {
    return null;
  }
  while (usedValues. includes(currentValue)) {
    currentValue = generateRandomInteger(1, MAX_URL_ID_COUNT);
  }
  usedValues.push(currentValue);
  return `photos/${ currentValue }.jpg`;
};

const generateAvatar = () => {
  const usedValues = [];
  let currentValue = generateRandomInteger(1, MAX_AVATAR_COUNT);
  if (usedValues.length >= MAX_AVATAR_COUNT) {
    return null;
  }
  while (usedValues. includes(currentValue)) {
    currentValue = generateRandomInteger(1, MAX_AVATAR_COUNT);
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
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: generateRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
  comments: generateCommentList(generateRandomInteger(MIN_COMMENT_ID_COUNT, MAX_COMMENT_ID_COUNT))
});

// eslint-disable-next-line no-unused-vars
const photos = Array.from({length: PHOTO_COUNT}, generateNewPhoto);
