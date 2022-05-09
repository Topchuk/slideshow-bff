import { Express } from 'express';

import { playerRouter } from './player/routers/player.router';
import { config } from './config/env.config';

const express = require('express');
const cors = require('cors');

const app: Express = express();
const port: number = 3000;

app.use(cors());

app.use('/', playerRouter)

app.listen(port, () => {
  console.log(`App is listening on server http://localhost:${ config.server.port }`);
});


