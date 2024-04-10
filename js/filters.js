import { shuffleArray, debounce } from './util.js';

const RANDOM_FILTER_COULT = 10;

const filters = document.querySelector('.img-filters');
const defaultFilter = filters.querySelector('#filter-default');
const randomFilter = filters.querySelector('#filter-random');
const discussedFilter = filters.querySelector('#filter-discussed');
const picturesContainer = document.querySelector('.pictures');

let photos = [];

const showFilters = () => {
  filters.classList.remove('img-filters--inactive');
};

const makeFilterActive = (filter) => {
  makeFiltersInactive();
  const className = filter.className;
  filter.classList.add(`${className}--active`);
};

const makeFiltersInactive = () => {
  const filterList = [defaultFilter,randomFilter, discussedFilter];
  filterList.forEach((filter) => {
    const className = filter.classList[0];
    filter.classList.remove(`${className}--active`);
  });
};

const replacePhotos = (photoList) => {
  photoList.forEach((photoElement) => {
    picturesContainer.removeChild(photoElement);
  });

  photoList.forEach((photoElement) => {
    picturesContainer.appendChild(photoElement);
  });
};

const handleDefaultFilter = () => {
  resetHiddenPhotos();
  makeFilterActive(defaultFilter);
  replacePhotos(photos);
};

const handleRandomFilter = () => {
  makeFilterActive(randomFilter);
  const photosCopy = photos.slice();
  const randomPhotos = shuffleArray(photosCopy).slice(0, RANDOM_FILTER_COULT);

  photos.forEach((photoElement) => {
    if(!randomPhotos.includes(photoElement)) {
      photoElement.classList.add('hidden');
    }
  });
};

const handleDiscussedFilter = () => {
  makeFilterActive(discussedFilter);
  resetHiddenPhotos();
  const photoElements = Array.from(picturesContainer.querySelectorAll('.picture'));

  photoElements.sort((a, b) => {
    const commentsA = a.querySelector('.picture__comments').textContent;
    const commentsB = b.querySelector('.picture__comments').textContent;
    return commentsB - commentsA;
  });

  replacePhotos(photoElements);
};

function resetHiddenPhotos() {
  photos.forEach((photoElement) => {
    photoElement.classList.remove('hidden');
  });
}

const handlePhotoFilters = () => {
  photos = Array.from(picturesContainer.querySelectorAll('.picture'));
  showFilters();

  defaultFilter.addEventListener('click', debounce(handleDefaultFilter));
  randomFilter.addEventListener('click', debounce(handleRandomFilter));
  discussedFilter.addEventListener('click', debounce(handleDiscussedFilter));
};

export { handlePhotoFilters };
