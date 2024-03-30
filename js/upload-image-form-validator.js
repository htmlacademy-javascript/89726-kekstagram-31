const uploadForm = document.querySelector('.img-upload__form');
const hashTagsInput = uploadForm.querySelector('.text__hashtags');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

let hashTagsValidationErrorMessage = '';

function getHashTagsValidationErrorMessage() {
  return hashTagsValidationErrorMessage;
}

function validateHashTagsInput() {
  if (hashTagsInput.value === '') {
    return true;
  }

  const hashTags = hashTagsInput.value.split(' ');

  if (hashTags.length > 5) {
    hashTagsValidationErrorMessage = 'нельзя указать больше пяти хэштегов';
    return false;
  }

  const hashTagsSet = new Set();

  for (const hashTag of hashTags) {
    if (!hashTag.startsWith('#')) {
      hashTagsValidationErrorMessage = 'хэштег должен начинаться с символа #';
      return false;
    }

    if (hashTag.length === 1) {
      hashTagsValidationErrorMessage = 'хэштег должен содержать более одного символа';
      return false;
    }

    if (hashTag.length > 20) {
      hashTagsValidationErrorMessage = 'хэштег не может быть более 20 символов';
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

pristine.addValidator(
  hashTagsInput,
  validateHashTagsInput,
  getHashTagsValidationErrorMessage
);


uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
