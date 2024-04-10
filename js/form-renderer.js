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
const originalEffect = document.querySelector('#effect-none');
const effectPreviews = document.querySelectorAll('.effects__preview');

const closeErrorModal = () => {
  const error = document.querySelector('.error');
  body.removeChild(error);
  document.addEventListener('keydown', onDocumentKeydown);
};

const resetFormFields = () =>{
  originalEffect.checked = true;
  input.value = '';
  hashTagsInput.value = '';
  commentInput.value = '';
};

const closeUploadModal = () =>{
  resetFormFields();
  resetEffects();
  resetImgScalerSetting();
  form.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openUploadModal = () =>{
  form.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  formCancelBtn.addEventListener('click', () => {
    closeUploadModal();
  });
};

input.addEventListener('change', () => {
  const file = input.files[0];
  imgPreview.src = URL.createObjectURL(file);
  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url("${URL.createObjectURL(file)}")` ;
  });
  openUploadModal();
});

const closeSuccessModal = () =>{
  const success = document.querySelector('.success');
  body.removeChild(success);
  document.removeEventListener('keydown', onSuccessModalKeydown);
};

const showSuccessMessageAndCloseModal = () =>{
  closeUploadModal();

  const successModal = successTemplate.cloneNode(true);
  const successBtn = successModal.querySelector('.success__button');

  body.appendChild(successModal);
  successBtn.addEventListener('click', closeSuccessModal);
  document.addEventListener('keydown', onSuccessModalKeydown);
};

const onErrorModalKeydown = (evt)=> {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeErrorModal();
  }
};

const showError = () =>{
  const errorTemplate = document.querySelector('#error').content.firstElementChild;
  const errorContainer = errorTemplate.cloneNode(true);
  const errorBtn = errorContainer.querySelector('.error__button');

  document.body.append(errorContainer);
  errorBtn.addEventListener('click', closeErrorModal);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onErrorModalKeydown);
};

function onDocumentKeydown(evt) {
  if (document.activeElement === hashTagsInput || document.activeElement === commentInput) {
    return;
  }

  if (isEscKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
}

function onSuccessModalKeydown(evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeSuccessModal();
  }
}

setUserFormSubmit(showSuccessMessageAndCloseModal, showError);
