require('dotenv').config();
const express = require('express');
const cors = require('cors');
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
  if (res.statusCode == 200) {
    const urlResponse = { original_url: undefined, short_url: undefined };
    urlResponse.original_url = req.body.url;
    urlResponse.short_url = shortUrlValue;
    let urlValue = urlResponse.original_url;
    inputUrls[urlValue] = urlResponse.short_url;
    shortUrlValue++;
    res.json(urlResponse);
  }
});

app.listen(port, function() {
  console.log('Your app is here: ' + `http://localhost:${port}`);
});
