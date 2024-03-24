import { photosDataset } from './data.js';
import { isEscKey } from './util.js';
const pictureTemplate = document.querySelector('#picture').content.firstElementChild;
const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentContainer = bigPicture.querySelector('.social__comment');
const bigPictureCancelBtn = bigPicture.querySelector('.big-picture__cancel');


function onDocumentKeydown(evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

function openBigPictureHandler() {
  picturesContainer.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('picture__img')) {
      const picture = document.querySelector('.big-picture__img img');
      const likesCount = bigPicture.querySelector('.likes-count');
      const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
      const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
      const commentCount = bigPicture.querySelector('.social__comment-count');
      const commentLoader = bigPicture.querySelector('.comments-loader');
      const caption = bigPicture.querySelector('.social__caption');

      const srcImgId = evt.target.closest('.picture').dataset.id;
      const srcPhoto = photosDataset.find((element) => Number(element.id) === Number(srcImgId));

      picture.src = srcPhoto.url;
      likesCount.textContent = srcPhoto.likes;
      commentTotalCount.textContent = srcPhoto.comments.length;
      commentShownCount.textContent = srcPhoto.comments.length;
      caption.textContent = srcPhoto.description;

      renderCommments(srcPhoto.comments);
      commentCount.classList.add('hidden');
      commentLoader.classList.add('hidden');

      bigPicture.classList.remove('hidden');
      document.querySelector('body').classList.add('modal-open');

      document.addEventListener('keydown', onDocumentKeydown);
      bigPictureCancelBtn.addEventListener('click', () => {
        closeBigPicture();
      });
    }
  });
}

function renderComment({id, avatar, message, name}) {
  const comment = commentContainer.cloneNode(true);
  comment.dataset.id = id;
  comment.querySelector('img').src = avatar;
  comment.querySelector('img').alt = name;
  comment.querySelector('p').textContent = message;
  return comment;
}

function renderCommments(data) {
  commentsContainer.textContent = '';
  const fragment = new DocumentFragment();
  data.map((comment) => {
    const commentElement = renderComment(comment);
    fragment.appendChild(commentElement);
  });
  commentsContainer.appendChild(fragment);
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
