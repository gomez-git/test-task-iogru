#!/usr/bin/env node
/* eslint-disable no-console */

import app from '../server/app.js';

const port = process.env.PORT ?? 5000;

app.listen(port, () => {
  console.log(`Server up on http://localhost:${port}/`);
});