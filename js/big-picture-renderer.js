import { isEscKey } from './util.js';

const COMMENT_LOAD_STEP = 5;

const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentContainer = bigPicture.querySelector('.social__comment');
const pictureCancelBtn = bigPicture.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentLoader = bigPicture.querySelector('.comments-loader');
const commentFragment = document.createDocumentFragment();

let displayedcommentCount = 0;


const onDocumentKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPicture.querySelector('.social__comment-count').classList.remove('hidden');
  bigPicture.querySelector('.social__comments-loader').classList.remove('hidden');
  displayedcommentCount = 0;
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  pictureCancelBtn.addEventListener('click', () => {
    closeBigPicture();
  });
};

const getCommentsChunk = (counterStep) => {
  const commentsNodes = bigPicture.querySelectorAll('.social__comment');
  const comments = Array.from(commentsNodes).slice(displayedcommentCount, displayedcommentCount + counterStep);

  return {
    comments,
    commentsNodes
  };
};

const showComments = (counterStep) => {
  const { comments } = getCommentsChunk(counterStep);

  comments.forEach((comment) => {
    comment.classList.remove('hidden');
    displayedcommentCount ++;
  });
  updateCommentsCount();
};

const onCommentsLoaderClick = () => {
  showComments(COMMENT_LOAD_STEP);
  updateCommentsCount(displayedcommentCount);
};

const updateCommentsCount = (counterStep) => {
  const { commentsNodes } = getCommentsChunk(counterStep);

  bigPicture.querySelector('.social__comment-shown-count').textContent = displayedcommentCount;
  bigPicture.querySelector('.social__comment-total-count').textContent = commentsNodes.length;
  if (displayedcommentCount >= commentsNodes.length) {
    hideLoader();
  }
};

const prepareBigPictureContent = ({url, likes, comments, description }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = comments.length;
  bigPicture.querySelector('.social__comment-shown-count').textContent = displayedcommentCount;
  bigPicture.querySelector('.social__caption').textContent = description;

  if (comments.length < COMMENT_LOAD_STEP) {
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    hideLoader();
  }

  fillBigPictureCommentsTemplate(comments);
  commentLoader.addEventListener('click', onCommentsLoaderClick);
};

const hideLoader = () => {
  bigPicture.querySelector('.social__comments-loader').classList.add('hidden');
};

const fillBigPictureCommentsTemplate = (commentsData) => {
  commentsData.forEach((item) => {
    const commentsTemplate = createComment(item);
    commentFragment.appendChild(commentsTemplate);
  });
  bigPicture.querySelector('.social__comments').appendChild(commentFragment);
};

const createComment = ({id, avatar, message, name}) => {
  const comment = commentContainer.cloneNode(true);
  comment.dataset.id = id;
  comment.querySelector('img').src = avatar;
  comment.querySelector('img').alt = name;
  comment.querySelector('p').textContent = message;
  comment.classList.add('hidden');

  return comment;
};

const renderCommments = (data) => {
  commentsContainer.textContent = '';
  const fragment = new DocumentFragment();
  data.map((comment) => {
    const commentElement = createComment(comment);
    fragment.appendChild(commentElement);
  });
  commentsContainer.appendChild(fragment);
};

const handlePictureClick = (data) => {
  picturesContainer.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('picture__img')) {
      const srcImgId = evt.target.closest('.picture').dataset.id;
      const srcPhoto = data.find((element) => Number(element.id) === Number(srcImgId));
      prepareBigPictureContent(srcPhoto);

      renderCommments(srcPhoto.comments);
      showComments(COMMENT_LOAD_STEP);
      openBigPicture();
    }
  });
};

export {handlePictureClick};
