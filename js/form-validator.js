import { sendData } from './api';
import { showAlert } from './util';

const uploadForm = document.querySelector('.img-upload__form');
const hashTagsInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const submitBtn = uploadForm.querySelector('.img-upload__submit');

const MAX_COMMENT_LENGTH = 140;
const MIN_COMMENT_LENGTH = 0;
const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MIN_HASHTAG_LENGTH = 1;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
}, false);

let hashTagsErrorMessage = '';

function getHashTagsValidationErrorMessage() {
  return hashTagsErrorMessage;
}

function startsWithHash(hashTag) {
  if (!hashTag.startsWith('#')) {
    hashTagsErrorMessage = 'хэштег должен начинаться с символа #';
    return false;
  }
  return true;
}

function isLongerThanMin(hashTag) {
  if (hashTag.length === MIN_HASHTAG_LENGTH) {
    hashTagsErrorMessage = `хэштег должен содержать более ${MIN_HASHTAG_LENGTH} символа`;
    return false;
  }
  return true;
}

function isShorterThanMax(hashTag) {
  if (hashTag.length > MAX_HASHTAG_LENGTH) {
    hashTagsErrorMessage = `хэштег не может быть более ${MAX_HASHTAG_LENGTH} символов`;
    return false;
  }
  return true;
}

function containsOnlyLettersAndNumbers(hashTag) {
  if (!/^#[a-zA-Zа-яА-Я0-9]*$/.test(hashTag)) {
    hashTagsErrorMessage = 'хэштег может содержать только буквы и цифры';
    return false;
  }
  return true;
}

function isUnique(hashTag, hashTagsSet) {
  const lowerCaseHashTag = hashTag.toLowerCase();
  if (hashTagsSet.has(lowerCaseHashTag)) {
    hashTagsErrorMessage = 'хэштег должен быть уникальным';
    return false;
  }
  hashTagsSet.add(lowerCaseHashTag);
  return true;
}

function validateHashTags() {
  if (hashTagsInput.value === '') {
    return true;
  }

  const hashTags = hashTagsInput.value.split(' ');

  if (hashTags.length > MAX_HASHTAGS_COUNT) {
    hashTagsErrorMessage = `нельзя указать больше ${MAX_HASHTAGS_COUNT} хэштегов`;
    return false;
  }

  const hashTagsSet = new Set();

  for (const hashTag of hashTags) {
    if (!startsWithHash(hashTag) ||
        !isLongerThanMin(hashTag) ||
        !isShorterThanMax(hashTag) ||
        !containsOnlyLettersAndNumbers(hashTag) ||
        !isUnique(hashTag, hashTagsSet)) {
      return false;
    }
  }

  return true;
}

function validateComment() {
  return commentInput.value.length >= MIN_COMMENT_LENGTH && commentInput.value.length <= MAX_COMMENT_LENGTH;
}

pristine.addValidator(
  commentInput,
  validateHashTags,
  getHashTagsValidationErrorMessage
);

pristine.addValidator(
  commentInput,
  validateComment,
  `длина комментария не может составлять больше ${MAX_COMMENT_LENGTH} символов`
);

const blockSubmitButton = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = SubmitButtonText.IDLE;
};

const setUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(
          (err) => {
            showAlert(err.message);
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

export { setUserFormSubmit };
