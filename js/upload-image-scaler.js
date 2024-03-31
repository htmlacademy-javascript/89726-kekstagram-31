
const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgUploadForm = document.querySelector('.img-upload__form');

scaleControlValue.value = `${DEFAULT_SCALE}%`;
imgUploadForm.dataset.scaleControlValue = scaleControlValue.value;

scaleControlSmaller.addEventListener('click', () => {
  let currentScale = parseInt(scaleControlValue.value, 10);
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    scaleControlValue.value = `${currentScale}%`;
    imgUploadPreview.style.transform = `scale(${currentScale / 100})`;
    imgUploadForm.dataset.scaleControlValue = scaleControlValue.value;
  }
});

scaleControlBigger.addEventListener('click', () => {
  let currentScale = parseInt(scaleControlValue.value, 10);
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    scaleControlValue.value = `${currentScale}%`;
    imgUploadPreview.style.transform = `scale(${currentScale / 100})`;
    imgUploadForm.dataset.scaleControlValue = scaleControlValue.value;
  }
});

function resetImgScalerSetting() {
  imgUploadPreview.style.transform = '';
  scaleControlValue.value = `${DEFAULT_SCALE}%`;
  imgUploadForm.dataset.scaleControlValue = scaleControlValue.value;
}

export {resetImgScalerSetting};
