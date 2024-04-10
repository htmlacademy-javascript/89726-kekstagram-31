const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;

const controlSmaller = document.querySelector('.scale__control--smaller');
const controlBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
const form = document.querySelector('.img-upload__form');

scaleValue.value = `${DEFAULT_SCALE}%`;
form.dataset.scaleControlValue = scaleValue.value;

controlSmaller.addEventListener('click', () => {
  let currentScale = parseInt(scaleValue.value, 10);
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    scaleValue.value = `${currentScale}%`;
    imgPreview.style.transform = `scale(${currentScale / MAX_SCALE})`;
    form.dataset.scaleControlValue = scaleValue.value;
  }
});

controlBigger.addEventListener('click', () => {
  let currentScale = parseInt(scaleValue.value, 10);
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    scaleValue.value = `${currentScale}%`;
    imgPreview.style.transform = `scale(${currentScale / MAX_SCALE})`;
    form.dataset.scaleControlValue = scaleValue.value;
  }
});

function resetImgScalerSetting() {
  imgPreview.style.transform = '';
  scaleValue.value = `${DEFAULT_SCALE}%`;
  form.dataset.scaleControlValue = scaleValue.value;
}

export {resetImgScalerSetting};
