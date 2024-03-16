import { generatePhotoList } from './data.js';

const pictureTemplate = document.querySelector('#picture').content;
const picture = pictureTemplate.firstElementChild;
const picturesContainer = document.querySelector('.pictures');
const fragment = new DocumentFragment();

const generatedPhotos = generatePhotoList();

for (let i = 0; i < generatedPhotos.length; i++) {
  const newPhoto = picture.cloneNode(true);
  newPhoto.querySelector('.picture__img').src = generatedPhotos[i].url;
  newPhoto.querySelector('.picture__img').alt = generatedPhotos[i].description;
  newPhoto.querySelector('.picture__likes').textContent = generatedPhotos[i].likes;
  newPhoto.querySelector('.picture__comments').textContent = generatedPhotos[i].comments.length;
  fragment.appendChild(newPhoto);
}

picturesContainer.appendChild(fragment);
