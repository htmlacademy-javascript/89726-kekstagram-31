import { photosDataset } from './data.js';
const pictureTemplate = document.querySelector('#picture').content.firstElementChild;
const picturesContainer = document.querySelector('.pictures');

function openBigPictureHandler() {
  picturesContainer.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('picture__img')) {
      const bigPicture = document.querySelector('.big-picture');
      const picture = document.querySelector('.big-picture__img img');
      const likesCount = bigPicture.querySelector('.likes-count');
      const commentCount = bigPicture.querySelector('.social__comment-total-count');
      const caption = bigPicture.querySelector('.social__caption');

      const srcImgId = evt.target.closest('.picture').dataset.id;
      const srcPhoto = photosDataset.find((element) => Number(element.id) === Number(srcImgId));

      picture.src = srcPhoto.url;
      likesCount.textContent = srcPhoto.likes;
      commentCount.textContent = srcPhoto.comments.length;
      caption.textContent = srcPhoto.description;
      console.log(srcPhoto);


      bigPicture.classList.remove('hidden');
    }
  });
}

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
