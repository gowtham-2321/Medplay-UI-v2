const express = require('express');
const path = require('path');
const axios = require('axios');
const morgan = require('morgan');
const { Readable } = require('stream');

const app = express();
const API_URL = "https://jiosaavn-api-privatecvc2.vercel.app/";

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/stream', async (req, res) => {
    const url = req.query.url || '';
    if (!url) {
        return res.status(400).send("No URL provided");
    }

    try {
        const upstreamResponse = await axios.get(url, {
            headers: { 'Range': req.headers.range || '' },
            responseType: 'stream'
        });

        res.setHeader('Content-Range', upstreamResponse.headers['content-range']);
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Content-Length', upstreamResponse.headers['content-length']);
        res.setHeader('Content-Type', upstreamResponse.headers['content-type']);

        upstreamResponse.data.pipe(res);
    } catch (e) {
        console.error("Error streaming content:", e);
        res.status(500).send("Error streaming content");
    }
});

app.get('/image', async (req, res) => {
    const url = req.query.url || '';
    if (!url) {
        return res.status(400).send("No URL provided");
    }

    try {
        const upstreamResponse = await axios.get(url, { responseType: 'stream' });

        res.setHeader('Content-Length', upstreamResponse.headers['content-length']);
        res.setHeader('Content-Type', upstreamResponse.headers['content-type']);

        upstreamResponse.data.pipe(res);
    } catch (e) {
        console.error("Error fetching image:", e);
        res.status(500).send("Error fetching image");
    }
});

app.get('/download', async (req, res) => {
    const url = req.query.url || '';
    if (!url) {
        return res.status(400).send("No URL provided");
    }

    const filename = req.query.filename || 'downloaded_song.mp3';

    try {
        const response = await axios.get(url, { responseType: 'stream' });

        res.setHeader('Content-Disposition', `attachment; filename=${filename}.mp3`);
        res.setHeader('Content-Type', 'audio/mpeg');

        response.data.pipe(res);
    } catch (e) {
        console.error("Error downloading file:", e);
        res.status(500).send("Error downloading file");
    }
});

app.listen(80, () => {
    console.log('Server is running on http://localhost');
});