const { gql } = require('apollo-server-express');

const typeDef = gql`
    type Shortener {
        baseUrl: String!
        shortUrl: String!
    }

    type Mutation {
        createShortener(baseUrl: String!, shortUrl: String!): Shortener
    }
`;

module.exports = typeDef;
