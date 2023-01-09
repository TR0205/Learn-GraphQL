const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const path = require("path");

const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

// リソルバ関数
const resolvers = {
    Query: {
        info: () => "HackerNewsクローン",
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
        },
    },
};

const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
    resolvers,
    context: {
        // 追加
        prisma,
    },
});

server
    .listen()
    .then(({ url }) => console.log(`${url}でサーバーを起動中・・・`));
