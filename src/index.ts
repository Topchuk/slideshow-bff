import { Express } from 'express';

import { playerRouter } from './player/routers/player.router';
import { config } from './config/env.config';

const express = require('express');
const cors = require('cors');

const app: Express = express();

app.use(cors());

app.use('/', playerRouter)

app.listen(config.server.port, () => {
  console.log(`App is listening on port${ config.server.port }`);
});


