const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const path = require("path");

let links = [
    {
        id: "link-0",
        description: "GraphQLチュートリアル",
        url: "www.udemy-graphql.com",
    },
];

// リソルバ関数
const resolvers = {
    Query: {
        info: () => "HackerNewsクローン",
        feed: () => links,
    },
    Mutation: {
        post: (parent, args) => {
            let idCount = links.length;
            const link = {
                id: `link-${idCount++}`,
                descriontion: args.descriontion,
                url: args.url,
            };
            links.push(link);
            // 追加した投稿を確認
            return link;
        },
    },
};

const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
    resolvers,
});

server
    .listen()
    .then(({ url }) => console.log(`${url}でサーバーを起動中・・・`));
