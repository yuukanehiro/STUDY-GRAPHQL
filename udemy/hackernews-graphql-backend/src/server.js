const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const path = require('path');

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
        feed: async (parent, args, context) => {
            return context.prisma.link.findMany();
        },
    },
    Mutation: {
        post: (parent, args, context) => {
            const newLink = context.prisma.link.create({
                data: {
                    url: args.url,
                    description: args.description,
                },
            });
            return newLink;
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        prisma,
    },
});

server
    .listen()
    .then(({ url }) => console.log(`${url}でserverを起動中・・・`));
