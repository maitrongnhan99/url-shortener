const ShortenerModel = require('../db/model');

const resolver = {
	Query: {
		shortener: async (parent, {url}) => {
			return ShortenerModel.findOne({
				baseUrl: url
			});
		}
	},
	Mutation: {
		createShortener: async (root, {baseUrl, shortUrl}) => {
			const newShortener = new ShortenerModel({
				baseUrl,
				shortUrl
			})

			await newShortener.save()
		}
	}
}

module.exports = resolver;
