import { openBigPictureHandler } from './fullPhotoRenderer.js';

const pictureTemplate = document.querySelector('#picture').content.firstElementChild;
const picturesContainer = document.querySelector('.pictures');

function renderPhoto({id, url, description, likes, comments}) {
  const photo = pictureTemplate.cloneNode(true);
  photo.dataset.id = id;
  photo.querySelector('.picture__img').src = url;
  photo.querySelector('.picture__img').alt = description;
  photo.querySelector('.picture__likes').textContent = likes;
  photo.querySelector('.picture__comments').textContent = comments.length;
  return photo;
}
function renderPhotos(photos) {
  const fragment = new DocumentFragment();
  photos.map((photo) => {
    const photoElement = renderPhoto(photo);
    fragment.appendChild(photoElement);
  });
  openBigPictureHandler();
  picturesContainer.appendChild(fragment);
}

export {renderPhotos};
