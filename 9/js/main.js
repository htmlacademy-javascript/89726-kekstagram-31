/* eslint-disable no-console */
import { getData } from './api.js';
import { handlePictureClick } from './big-picture-renderer.js';
import { renderPhotos } from './thumbnails.js';
import { showAlert } from './util.js';
import './form-renderer.js';
import './scaler.js';
import './effector.js';

getData()
  .then((photos) => {
    renderPhotos(photos);
    handlePictureClick(photos);
  })
  .catch((err) => {
    showAlert(err.message);
  });

