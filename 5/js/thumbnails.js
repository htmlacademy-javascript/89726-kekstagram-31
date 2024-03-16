const pictureTemplate = document.querySelector('#picture').content.firstElementChild;
const picturesContainer = document.querySelector('.pictures');
const fragment = new DocumentFragment();

function renderPhoto({url, description, likes, comments}) {
  const photo = pictureTemplate.cloneNode(true);
  photo.querySelector('.picture__img').src = url;
  photo.querySelector('.picture__img').alt = description;
  photo.querySelector('.picture__likes').textContent = likes;
  photo.querySelector('.picture__comments').textContent = comments.length;
  fragment.appendChild(photo);
  return photo;
}
function renderPhotos(photos) {
  photos.map(renderPhoto);
  picturesContainer.appendChild(fragment);
}

export {renderPhotos};
