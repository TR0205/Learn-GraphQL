const { ApolloServer, gql } = require("apollo-server");

let links = [
    {
        id: "link-0",
        description: "GraphQLチュートリアル",
        url: "www.udemy-graphql.com",
    },
];

// スキーマ構造
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

// リソルバ関数
const resolvers = {
    Query: {
        info: () => "HackerNewsクローン",
        feed: () => links,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server
    .listen()
    .then(({ url }) => console.log(`${url}でサーバーを起動中・・・`));
