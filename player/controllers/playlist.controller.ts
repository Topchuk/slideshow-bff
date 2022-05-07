import { Request, Response } from 'express';
import { DEFAULT_SCREEN_KEY } from '../configs/player.configs';
import { playerService } from '../services/player.service';

const proxy = require('express-http-proxy');

export class PlaylistController {
  async getPlaylist(req: Request, res: Response) {
    try {
      const screenKey = req.params[ 'screenKey' ] || DEFAULT_SCREEN_KEY;
      const playlists = await playerService.getPlaylists(screenKey);
      res.send(playlists);
    } catch (e) {
      res.send(e);
    }
  }

  getMedia() {
    return proxy('test.onsignage.com', {
      proxyReqPathResolver: function (req: Request) {
        return '/PlayerBackend/creative/get/' + req.query[ 'mediaKey' ];
      }
    })
  }
}

const playlistController = new PlaylistController();
export { playlistController };
