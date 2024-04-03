const imagePreview = document.querySelector('.img-upload__preview');
const effectLevel = document.querySelector('.effect-level__value');
const effectList = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.img-upload__effect-level');
const form = document.querySelector('.img-upload__form');

noUiSlider.create(sliderElement, {
  start: 1,
  step: 0.1,
  range: {
    min: 0,
    max: 1
  },
});

sliderElement.style.display = 'none';
form.dataset.effect = 'none';

sliderElement.noUiSlider.on('update', (values, handle) => {
  effectLevel.value = values[handle];

  const effect = document.querySelector('.effects__radio:checked').value;
  switch (effect) {
    case 'chrome':
      updateEffect(`grayscale(${effectLevel.value})`);
      break;
    case 'sepia':
      updateEffect(`sepia(${effectLevel.value})`);
      break;
    case 'marvin':
      updateEffect(`invert(${effectLevel.value * 100}%)`);
      break;
    case 'phobos':
      updateEffect(`blur(${effectLevel.value * 3}px)`);
      break;
    case 'heat':
      updateEffect(`brightness(${effectLevel.value * 3})`);
      break;
    case 'none':
      updateEffect('none');
      break;
  }
});

effectList.addEventListener('change', (evt) => {
  const effect = evt.target.value;

  if (effect === 'none') {
      sliderElement.style.display = 'none';
    } else {
      sliderElement.style.display = 'block';
    }

  sliderElement.noUiSlider.set(1);
});

function updateEffect(value) {
  imagePreview.style.filter = value;
  form.dataset.effect = value;
}

function resetEffects() {
  sliderElement.style.display = 'none';
  imagePreview.style.filter = 'none';
  form.dataset.effect = 'none';
}

export {resetEffects};
