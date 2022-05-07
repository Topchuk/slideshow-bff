import { Express, Request, Response } from 'express';

import { IncomingMessage } from 'http';
import { PlaylistResponse } from './models/playlist.models';

const express = require('express');
const https = require('https');
const cors = require('cors');
const proxy = require('express-http-proxy');


const app: Express = express();
const port: number = 3000;

function getPlaylists(screenKey: string) {
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

app.use(cors());

app.get('/key', async (req: Request, res: Response) => {
  const defaultScreenKey = '0f127773-529f-4ff8-b211-af9e5c22a5bc';
  const screenKey = req.params[ 'screenKey' ] || defaultScreenKey;
  const playlists = await getPlaylists(screenKey);
  res.send(playlists);
});

app.get('/media', proxy('test.onsignage.com', {
  proxyReqPathResolver: function (req: Request) {
    return '/PlayerBackend/creative/get/' + req.query[ 'mediaKey' ];
  }
}));

app.listen(port, () => {
  console.log(`App is listening on server http://localhost:${ port }`);
});


