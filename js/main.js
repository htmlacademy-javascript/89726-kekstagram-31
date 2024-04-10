import { getData } from './api.js';
import { handlePictureClick } from './big-picture-renderer.js';
import { renderPhotos } from './thumbnails.js';
import { showAlert } from './util.js';
import { handlePhotoFilters } from './filters.js';
import './form-renderer.js';
import './scaler.js';
import './effector.js';

getData()
  .then((photos) => {
    renderPhotos(photos);
    handlePictureClick(photos);
    handlePhotoFilters();
  })
  .catch((err) => {
    showAlert(err.message);
  });

