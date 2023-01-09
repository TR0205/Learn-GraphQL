// データベースにアクセスするためのクライアントライブラリ
const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    // レコード追加
    const newLink = await prisma.link.create({
        data: {
            description: "GraphQLチュートリアル",
            url: "www.udemy-graphql.com",
        },
    });
    // レコード取得
    const allLinks = await prisma.link.findMany();
    console.log(allLinks);
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        // データベース接続を閉じる
        prisma.$disconnect;
    });
