import { shuffleArray } from './util.js';
const filters = document.querySelector('.img-filters');
const defaultFilter = filters.querySelector('#filter-default');
const randomFilter = filters.querySelector('#filter-random');
const discussedFilter = filters.querySelector('#filter-discussed');
const picturesContainer = document.querySelector('.pictures');

let photos = [];

window.addEventListener('load', showFilters);

function showFilters() {
  filters.classList.remove('img-filters--inactive');
}

function handleDefaultFilter() {
  resetHiddenPhotos();
  replacePhotos(photos);
}

function replacePhotos(photoList) {
  photoList.forEach((photoElement) => {
    picturesContainer.removeChild(photoElement);
  });

  photoList.forEach((photoElement) => {
    picturesContainer.appendChild(photoElement);
  });
}

function handleRandomFilter() {
  const photosCopy = photos.slice();
  const randomPhotos = shuffleArray(photosCopy).slice(0, 10);

  photos.forEach((photoElement) => {
    if(!randomPhotos.includes(photoElement)) {
      photoElement.classList.add('hidden');
    }
  });
}

function handleDiscussedFilter() {
  resetHiddenPhotos();
  const photoElements = Array.from(picturesContainer.querySelectorAll('.picture'));

  photoElements.sort((a, b) => {
    const commentsA = a.querySelector('.picture__comments').textContent;
    const commentsB = b.querySelector('.picture__comments').textContent;
    return commentsB - commentsA;
  });

  replacePhotos(photoElements);
}

function resetHiddenPhotos() {
  photos.forEach((photoElement) => {
    photoElement.classList.remove('hidden');
  });
}

function handlePhotoFilters() {
  photos = Array.from(picturesContainer.querySelectorAll('.picture'));

  defaultFilter.addEventListener('click', handleDefaultFilter);
  randomFilter.addEventListener('click', handleRandomFilter);
  discussedFilter.addEventListener('click', handleDiscussedFilter);
}

export { handlePhotoFilters };
