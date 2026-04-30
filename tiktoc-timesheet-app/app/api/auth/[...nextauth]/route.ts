import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (
          credentials?.email === "admin@test.com" &&
          credentials?.password === "123456"
        ) {
          return { id: "1", email: "admin@test.com" };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET, // 👈 THIS IS REQUIRED
});

export { handler as GET, handler as POST };