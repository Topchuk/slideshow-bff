import { Router } from 'express';
import { playlistController } from '../controllers/playlist.controller';

export const playerRouter = Router();

playerRouter
  .route('/media')
  .get(playlistController.getMedia)

playerRouter
  .route('/key')
  .get(playlistController.getPlaylist)
