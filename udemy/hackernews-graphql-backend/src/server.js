const { ApolloServer, gql } = require('apollo-server');

let links = [
    {
        id: 'link-0',
        description: "チュートリアルを学ぶ",
        url: "www.howtographql.com",
    },
];

// GraphQL schema定義
const typeDefs = gql`
    type Query {
        info: String!
        feed: [Link]!
    }

    type Link {
        id: ID!
        description: String!
        url: String!
    }
`;

// Resolver
const resolvers = {
    Query: {
        info: () => `Hackernews clone`,
        feed: () => links,
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server
    .listen()
    .then(({ url }) => console.log(`${url}でserverを起動中・・・`));

