import https from 'https';
import { IncomingMessage } from 'http';
import { PlaylistResponse } from '../models/playlist.models';

export class PlayerService {
  getPlaylists(screenKey: string): Promise<PlaylistResponse> {
    return new Promise((resolve, reject) => {
      try {
        const reqOptions = {
          hostname: 'test.onsignage.com',
          port: 443,
          path: `/PlayerBackend/screen/playlistItems/${ screenKey }`,
          method: 'GET',
        };

        const req = https.request(reqOptions, (res: IncomingMessage) => {
          res.on('data', (d: string) => {
            const playlist: PlaylistResponse = JSON.parse(d);
            return resolve(playlist);
          });
        });
        req.on('error', (error: Error) => {
          console.error(error);
          return reject(error);
        });

        req.end();
      } catch (e) {
        reject(e);
      }
    });
  }
}

const playerService = new PlayerService();
export { playerService };
