import { shuffleArray } from './util.js';
const filters = document.querySelector('.img-filters');
const defaultFilter = filters.querySelector('#filter-default');
const randomFilter = filters.querySelector('#filter-random');
const discussedFilter = filters.querySelector('#filter-discussed');

let photos = [];

function showFilters() {
  filters.classList.remove('img-filters--inactive');
}

window.addEventListener('load', showFilters);

function hidePhoto(photo) {
  photo.classList.add('hidden');
}

function showPhoto(photo) {
  photo.classList.remove('hidden');
}


function handleRandomFilter() {
  const randomPhotos = shuffleArray(photos).slice(0, 10);
  renderPhotos(randomPhotos);
}

function renderPhotos(photosToShow) {
  const allPhotosElements = document.querySelectorAll('.picture');

  allPhotosElements.forEach((photoElement) => {
    const photoId = photoElement.dataset.id;

    if (photosToShow.find((photo) => photo.id === Number(photoId))) {
      photoElement.classList.remove('hidden');
    } else {
      photoElement.classList.add('hidden');
    }
  });
}

function handlePhotoFilters(photoList) {
  photos = photoList;
  randomFilter.addEventListener('click', handleRandomFilter);
}

export { handlePhotoFilters };
