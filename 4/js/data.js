import {getRandomArrayElement, generateRandomInteger} from './util.js';

const PHOTO_COUNT = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MAX_COMMENT_ID_COUNT = 5000;
const MIN_AVATAR_COUNT = 1;
const MAX_AVATAR_COUNT = 6;

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

const generateCommentId = () => {
  const usedValues = [];
  let currentValue = generateRandomInteger(1, MAX_COMMENT_ID_COUNT);
  if (usedValues.length >= MAX_COMMENT_ID_COUNT) {
    return null;
  }
  while (usedValues. includes(currentValue)) {
    currentValue = generateRandomInteger(1, MAX_COMMENT_ID_COUNT);
  }
  usedValues.push(currentValue);
  return currentValue;
};

const generateNewComment = () => () => {
  const avatarId = generateRandomInteger(MIN_AVATAR_COUNT, MAX_AVATAR_COUNT);

  return {
    id: generateCommentId(),
    avatar: `img/avatar-${avatarId}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES)
  };
};

const generateNewPhoto = () => {
  let id = 1;

  return () => {
    const photo = {
      id: id,
      url: `photos/${id}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: generateRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
      comments: Array.from({length: generateRandomInteger(MIN_COMMENTS, MAX_COMMENTS)}, generateNewComment())
    };

    id++;
    return photo;
  };
};

const generatePhotoList = () => {
  Array.from({length: PHOTO_COUNT}, generateNewPhoto());
};

export {generatePhotoList};
