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

function handleRandomFilter() {
  const randomPhotos = shuffleArray(photos).slice(0, 10);
  renderPhotos(randomPhotos);
}

function handleDiscussedFilter() {
  const container = document.querySelector('.pictures');
  const photoElements = Array.from(container.querySelectorAll('.picture'));

  photoElements.sort((a, b) => {
    const commentsA = a.querySelector('.picture__comments').textContent;
    const commentsB = b.querySelector('.picture__comments').textContent;
    return commentsB - commentsA;
  });

  photoElements.forEach((photoElement) => {
    container.removeChild(photoElement);
  });

  photoElements.forEach((photoElement) => {
    container.appendChild(photoElement);
  });
}


function handleDefaultFilter() {
  renderPhotos(photos);
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
  discussedFilter.addEventListener('click', handleDiscussedFilter);
  defaultFilter.addEventListener('click', handleDefaultFilter);
}

export { handlePhotoFilters };
