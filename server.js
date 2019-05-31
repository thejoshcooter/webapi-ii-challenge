const express = require('express');
const bodyParser = require('body-parser');

const server = express();

server.use(express.json());
server.use(bodyParser.urlencoded({extended: false}));

// route imports
const postsRoutes = require('./api/posts/posts');

// posts router
server.use('/api/posts', postsRoutes);

// fallback
server.use('/', (req, res) => {
    res.status(200).send('<h1>WebAPI Challenge 2</h1>')
});

module.exports = server;0