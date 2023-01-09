const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

APP_SECRET = "GraphQL";

// ユーザーの新規登録のリゾルバ
async function signup(parent, args, context) {
    // パスワードの設定
    const password = await bcrypt.hash(args.password, 10);

    // ユーザーの新規作成
    const user = await context.prisma.user.create({
        ...args,
        password,
    });

    // トークンの生成
    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user,
    };
}
