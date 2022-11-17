require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dns = require('node:dns');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const ShortenerModel = require('./db/model');
const urlParser = require('url-parser');

// Basic Configuration
const port = process.env.PORT || 3000;

const connectServer = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://admin:admin123@graphql.iktalhr.mongodb.net/?w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log(`🚀 MongoDB connected...`);
    } catch (error) {
        console.log({ error }, '@error connect to Mongodb');
    }
};
//
// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: () => null,
// });

const main = async () => {
    await connectServer();
    // await server.start();
    // server.applyMiddleware({ app });
};

main().catch((err) => console.log({ err }, '@Error when starting server'));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
    res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {
    const bodyUrl = req.body.url;

    dns.lookup(urlParser.parse(bodyUrl).hostname, (error, address, family) => {
        if (!address) {
            res.json({ error: 'Invalid URL' });
        } else {
            const url = new ShortenerModel({ baseUrl: bodyUrl });
            url.save((error, data) => {
                res.json({
                    original_url: data.baseUrl,
                    short_url: data.id,
                });
            });
        }
    });
});

app.get('/api/shorturl/:id', (req, res) => {
    const id = req.params.id;

    ShortenerModel.findById(id, (error, data) => {
        if (!data) {
            res.json({ error: 'Invalid URL' });
        } else {
            res.redirect(data.baseUrl);
        }
    });
});

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
