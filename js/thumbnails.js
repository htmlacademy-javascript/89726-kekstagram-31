const pictureTemplate = document.querySelector('#picture').content.firstElementChild;
const picturesContainer = document.querySelector('.pictures');

function openBigPictureHandler() {
  picturesContainer.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('picture__img')) {
      const bigPicture = document.querySelector('.big-picture');
      const picture = document.querySelector('.big-picture__img img');
      const likes = document.querySelector('.likes-count');
      picture.src = evt.target.src;
      picture.alt = evt.target.alt;
      console.log(evt.target);

      likes.textContent = evt.target.innerHTML.likes;


      bigPicture.classList.remove('hidden');
    }
  });
}

function renderPhoto({url, description, likes, comments}) {
  const photo = pictureTemplate.cloneNode(true);
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
