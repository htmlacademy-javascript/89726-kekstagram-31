import { isEscKey } from './util.js';
import './upload-image-form-validator.js';

const uploadImgInput = document.querySelector('.img-upload__input');
const uploadImgForm = document.querySelector('.img-upload__overlay');
const uploadFormCancelBtn = uploadImgForm.querySelector('.img-upload__cancel');
const hashTagsInput = uploadImgForm.querySelector('.text__hashtags');
const commentInput = uploadImgForm.querySelector('.text__description');
const body = document.querySelector('body');

function onDocumentKeydown(evt) {
  if (isEscKey(evt)) {
    if (document.activeElement === hashTagsInput || document.activeElement === commentInput) {
      return;
    }
    evt.preventDefault();
    closeUploadModal();
  }
}

function openUploadModal() {
  uploadImgForm.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadFormCancelBtn.addEventListener('click', () => {
    closeUploadModal();
  });
}

function closeUploadModal() {
  resetFormFields();
  uploadImgForm.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

uploadImgInput.addEventListener('change', () => {
  openUploadModal();
});

function resetFormFields() {
  uploadImgInput.value = '';
  hashTagsInput.value = '';
  commentInput.value = '';
}