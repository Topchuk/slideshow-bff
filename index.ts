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
        console.log(`statusCode: ${ res.statusCode }`);

        res.on('data', (d: string) => {
          const playlist: PlaylistResponse = JSON.parse(d);
          console.log('DATa', playlist);
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

function getMedia(imageKey: string) {
  return new Promise((resolve, reject) => {
    try {
      const reqImageOptions = {
        hostname: 'test.onsignage.com',
        port: 443,
        path: `/PlayerBackend/creative/get/${ imageKey }`,
        method: 'GET',
      };

      const reqImage = https.request(reqImageOptions, (resImage: IncomingMessage) => {
        resImage.on('data', (dImage) => {
          console.log('DATA', dImage);
          const image = JSON.stringify(dImage);
          reqImage.end();

          return resolve(image);
        });
      });

      reqImage.on('error', (error: Error) => {
        console.error(error);
      });

    } catch (e) {
      console.error(e);
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

// app.get('/media', async (req: Request, res: Response) => {
//   const defaultMediaKey = 'b1f1b49b-46b8-49ef-8177-309d28128bf7.jpg';
//   const screenKey = req.params[ 'mediaKey' ] || defaultMediaKey;
//   const playlists = await getMedia(screenKey);
//   res.send('http://teststatic.onsignage.com/test/media/b/1/f/1/b1f1b49b-46b8-49ef-8177-309d28128bf7.jpg');
// });

app.get('/media', proxy('test.onsignage.com', {
  proxyReqPathResolver: function (req: Request) {
    console.log(req);
    return '/PlayerBackend/creative/get/' + req.query[ 'mediaKey' ];
  }
}));

app.listen(port, () => {
  console.log(`App is listening on server http://localhost:${ port }`);
});


