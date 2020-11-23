import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './client/App';

const app = express();

app.get('/', (req, res) => {
  const content = renderToString(<App />);
  res.send(content);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});