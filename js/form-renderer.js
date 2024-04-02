import { isEscKey } from './util.js';
import './form-validator.js';

const input = document.querySelector('.img-upload__input');
const form = document.querySelector('.img-upload__overlay');
const formCancelBtn = form.querySelector('.img-upload__cancel');
const hashTagsInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const body = document.querySelector('body');

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
  form.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

input.addEventListener('change', () => {
  openUploadModal();
});

function resetFormFields() {
  input.value = '';
  hashTagsInput.value = '';
  commentInput.value = '';
}
