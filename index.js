require('dotenv').config();
const { URL } = require('url');
const express = require('express');
const cors = require('cors');
const helpers = require('./utils/helper.js');
const app = express();

let inputUrls = {};
let shortUrlValue = 0;

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded());

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl', function(req, res) {
  const okStatus = res.statusCode == 200;
  const isValidUrl = helpers.stringIsAValidUrl(req.body.url, ['http', 'https']);

  if (okStatus && isValidUrl) {
    const urlResponse = { original_url: undefined, short_url: undefined };
    urlResponse.original_url = req.body.url;
    urlResponse.short_url = shortUrlValue;
    let urlValue = urlResponse.short_url;
    inputUrls[urlValue] = urlResponse.original_url;
    shortUrlValue++;
    res.json(urlResponse);
  } else {
    res.json({ error: 'invalid url' });
  }
});

app.get('/api/shorturl/:short_url?', function(req, res) {
  const okStatus = res.statusCode == 200;
  const shortUrl = req.params.short_url;
  const hasShortUrlProperty = inputUrls.hasOwnProperty(shortUrl);

  if (okStatus && shortUrl && hasShortUrlProperty) {
    res.redirect(`${inputUrls[req.params.short_url]}`);
  } else {
    res.json({ error: 'invalid url' });
  }
});

app.listen(port, function() {
  console.log('Your app is here: ' + `http://localhost:${port}`);
});
