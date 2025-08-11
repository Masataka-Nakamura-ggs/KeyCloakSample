import NextAuth, { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import KeycloakProvider from "next-auth/providers/keycloak";

// NextAuth（Auth.js）の設定
export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.AUTH_KEYCLOAK_ID || "",
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET || "",
      issuer: process.env.AUTH_KEYCLOAK_ISSUER || "",
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    // セッションにユーザー情報を追加
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub || "";
        session.user.name = token.name || null;
        session.user.email = token.email || null;
      }
      return session;
    },
    // トークンからの情報取得とセッションへの受け渡し
    async jwt({ token, profile }) {
      if (profile) {
        token.name = profile.name;
        token.email = profile.email;
      }
      return token;
    },
  },
};

// Auth.js v4のハンドラーを初期化
const handler = NextAuth(authOptions);

// サーバーコンポーネントで使用するセッション取得関数
export const getAuthSession = async () => {
  const session = await getServerSession(authOptions);
  return session || { user: null };
};

// API Route handlers for App Router
export { handler as GET, handler as POST };
