/* eslint-disable no-console */
import { getData } from './api.js';
import { handleBigPictureOpen } from './big-picture-renderer.js';
import { renderPhotos } from './thumbnails.js';
import { showAlert } from './util.js';
import './form-renderer.js';
import './scaler.js';
import './effector.js';

getData()
  .then((photos) => {
    renderPhotos(photos);
    handleBigPictureOpen(photos);
  })
  .catch((err) => {
    showAlert(err.message);
  });

