import { Router } from 'express';
import { playlistController } from '../controllers/playlist.controller';

export const playerRouter = Router();
const proxy = require('express-http-proxy');

playerRouter
  .route('/media')
  .get(proxy('test.onsignage.com', {
    proxyReqPathResolver: playlistController.getMedia,
  }));

playerRouter
  .route('/key')
  .get(playlistController.getPlaylist);
