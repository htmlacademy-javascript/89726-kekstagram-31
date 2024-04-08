import { isEscKey } from './util.js';
import { resetEffects } from './effector.js';
import { resetImgScalerSetting } from './scaler.js';
import { setUserFormSubmit } from './form-validator.js';

const successTemplate = document.querySelector('#success').content.firstElementChild;
const input = document.querySelector('.img-upload__input');
const form = document.querySelector('.img-upload__overlay');
const formCancelBtn = form.querySelector('.img-upload__cancel');
const hashTagsInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const body = document.querySelector('body');
const imgPreview = document.querySelector('.img-upload__preview img');

function onDocumentKeydown(evt) {
  if (document.activeElement === hashTagsInput || document.activeElement === commentInput) {
    return;
  }

  if (isEscKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
}

function openUploadModal() {
  form.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  formCancelBtn.addEventListener('click', () => {
    closeUploadModal();
  });
}

function closeUploadModal() {
  resetFormFields();
  resetEffects();
  resetImgScalerSetting();
  form.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

input.addEventListener('change', () => {
  const file = input.files[0];
  imgPreview.src = URL.createObjectURL(file);
  openUploadModal();
});

function resetFormFields() {
  input.value = '';
  hashTagsInput.value = '';
  commentInput.value = '';
}

function closeSuccessModal() {
  const success = document.querySelector('.success');
  body.removeChild(success);
  document.removeEventListener('keydown', onSuccessModalKeydown);
}

function onSuccessModalKeydown(evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeSuccessModal();
  }
}

function showSuccessMessageAndCloseModal() {
  closeUploadModal();

  const successModal = successTemplate.cloneNode(true);
  const successBtn = successModal.querySelector('.success__button');

  body.appendChild(successModal);
  successBtn.addEventListener('click', closeSuccessModal);
  document.addEventListener('keydown', onSuccessModalKeydown);
}

function closeErrorModal() {
  const error = document.querySelector('.error');
  body.removeChild(error);
  document.addEventListener('keydown', onDocumentKeydown);
}

function onErrorModalKeydown(evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeErrorModal();
  }
}

function showError() {
  const errorTemplate = document.querySelector('#error').content.firstElementChild;
  const errorContainer = errorTemplate.cloneNode(true);
  const errorBtn = errorContainer.querySelector('.error__button');

  document.body.append(errorContainer);
  errorBtn.addEventListener('click', closeErrorModal);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onErrorModalKeydown);
}

setUserFormSubmit(showSuccessMessageAndCloseModal, showError);
