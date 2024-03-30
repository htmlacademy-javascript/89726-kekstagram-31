const uploadForm = document.querySelector('.img-upload__form');
const hashTagsInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const MAX_COMMENT_LENGTH = 140;
const MIN_COMMENT_LENGTH = 0;
const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MIN_HASHTAG_LENGTH = 1;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

let hashTagsValidationErrorMessage = '';

function getHashTagsValidationErrorMessage() {
  return hashTagsValidationErrorMessage;
}

function validateHashTags() {
  if (hashTagsInput.value === '') {
    return true;
  }

  const hashTags = hashTagsInput.value.split(' ');

  if (hashTags.length > MAX_HASHTAGS_COUNT) {
    hashTagsValidationErrorMessage = `нельзя указать больше ${MAX_HASHTAGS_COUNT} хэштегов`;
    return false;
  }

  const hashTagsSet = new Set();

  for (const hashTag of hashTags) {
    if (!hashTag.startsWith('#')) {
      hashTagsValidationErrorMessage = 'хэштег должен начинаться с символа #';
      return false;
    }

    if (hashTag.length === MIN_HASHTAG_LENGTH) {
      hashTagsValidationErrorMessage = `хэштег должен содержать более ${MIN_HASHTAG_LENGTH} символа`;
      return false;
    }

    if (hashTag.length > MAX_HASHTAG_LENGTH) {
      hashTagsValidationErrorMessage = `хэштег не может быть более ${MAX_HASHTAG_LENGTH} символов`;
      return false;
    }

    if (!/^#[a-zA-Zа-яА-Я0-9]*$/.test(hashTag)) {
      hashTagsValidationErrorMessage = 'хэштег может содержать только буквы и цифры';
      return false;
    }

    const lowerCaseHashTag = hashTag.toLowerCase();
    if (hashTagsSet.has(lowerCaseHashTag)) {
      hashTagsValidationErrorMessage = 'хэштег должен быть уникальным';
      return false;
    }

    hashTagsSet.add(lowerCaseHashTag);
  }

  return true;
}


function validateComment() {
  return commentInput.value.length >= MIN_COMMENT_LENGTH && commentInput.value.length <= MAX_COMMENT_LENGTH;
}

pristine.addValidator(
  hashTagsInput,
  validateHashTags,
  getHashTagsValidationErrorMessage
);

pristine.addValidator(
  commentInput,
  validateComment,
  `длина комментария не может составлять больше ${MAX_COMMENT_LENGTH} символов`
);


uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
