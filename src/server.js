const { ApolloServer, gql } = require("apollo-server");

// スキーマ構造
const typeDefs = gql`
    type Query {
        info: String!
    }
`;

const resolvers = {
    Query: {
        info: () => "HackerNewsクローン",
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server
    .listen()
    .then(({ url }) => console.log(`${url}でサーバーを起動中・・・`));
