const { gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlShortenerSchema = new Schema({
    baseUrl: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('shortener', UrlShortenerSchema);
