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

    type Mutation {
        post(url: String!, description: String!): Link!
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
    Mutation: {
        post: (parent, args) => {
            let idCount = links.length;

            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            };

            links.push(link)
            return link;
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server
    .listen()
    .then(({ url }) => console.log(`${url}でserverを起動中・・・`));
