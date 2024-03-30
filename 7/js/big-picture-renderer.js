import { photosDataset } from './data.js';
import { isEscKey } from './util.js';

const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentContainer = bigPicture.querySelector('.social__comment');
const bigPictureCancelBtn = bigPicture.querySelector('.big-picture__cancel');
const body = document.querySelector('body');


function onDocumentKeydown(evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

function openBigPicture() {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCancelBtn.addEventListener('click', () => {
    closeBigPicture();
  });
}

function prepareBigPictureContent(srcPhoto) {
  const picture = document.querySelector('.big-picture__img img');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
  const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
  const caption = bigPicture.querySelector('.social__caption');

  picture.src = srcPhoto.url;
  likesCount.textContent = srcPhoto.likes;
  commentTotalCount.textContent = srcPhoto.comments.length;
  commentShownCount.textContent = srcPhoto.comments.length;
  caption.textContent = srcPhoto.description;
}

function hideCommentBlock() {
  const commentCount = bigPicture.querySelector('.social__comment-count');
  const commentLoader = bigPicture.querySelector('.comments-loader');
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
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

picturesContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('picture__img')) {
    const srcImgId = evt.target.closest('.picture').dataset.id;
    const srcPhoto = photosDataset.find((element) => Number(element.id) === Number(srcImgId));
    prepareBigPictureContent(srcPhoto);

    renderCommments(srcPhoto.comments);
    hideCommentBlock();
    openBigPicture();
  }
});
