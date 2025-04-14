const express = require('express');
const { nanoid } = require('nanoid');
const app = express();
const port = 3000;

const urlDatabase = {};

app.use(express.json());
app.use(express.static(__dirname));

app.post('/shorten-url', (req, res) => {
    const { originalUrl } = req.body;
    const shortCode = nanoid(6);
    urlDatabase[shortCode] = originalUrl;
    res.json({ shortenedUrl: `http://localhost:${port}/${shortCode}` });
});

app.get('/:shortCode', (req, res) => {
    const { shortCode } = req.params;
    const originalUrl = urlDatabase[shortCode];
    if (originalUrl) {
        res.redirect(originalUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
