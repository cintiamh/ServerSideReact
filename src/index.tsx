import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './client/App';

const app = express();

// tell express to treat the public folder as static (public)
app.use(express.static('public'));

app.get('/', (req, res) => {
  const content = renderToString(<App />);
  const html = `
		<html>
			<head></head>
			<body>
				<div id="root">${content}</div>
				<script src="bundle.js"></script>
			</body>
		</html>
	`;
  res.send(html);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});