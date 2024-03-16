const pictureTemplate = document.querySelector('#picture').content;
const picture = pictureTemplate.firstElementChild;
const picturesContainer = document.querySelector('.pictures');
const fragment = new DocumentFragment();

// const generatedPhotos = generatePhotoList();

function renderPhoto({url, description, likes, comments}) {
  const photo = picture.cloneNode(true);
  photo.querySelector('.picture__img').src = url;
  photo.querySelector('.picture__img').alt = description;
  photo.querySelector('.picture__likes').textContent = likes;
  photo.querySelector('.picture__comments').textContent = comments.length;
  fragment.appendChild(photo);
  return photo;
}
function renderPictures(photos) {
  photos.map(renderPhoto);
  picturesContainer.appendChild(fragment);
}

export {renderPictures};
