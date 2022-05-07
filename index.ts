import { Express } from 'express';

import { playlistController } from './player/controllers/playlist.controller';

const express = require('express');
const cors = require('cors');

const app: Express = express();
const port: number = 3000;

app.use(cors());

app.get('/key', playlistController.getPlaylist);

app.get('/media', playlistController.getMedia);

app.listen(port, () => {
  console.log(`App is listening on server http://localhost:${ port }`);
});


