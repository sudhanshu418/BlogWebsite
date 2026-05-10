import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";

const providers = [
  CredentialsProvider({
    id: "credentials",
    name: "Credentials",
    async authorize(credentials) {
      await connect();
      const user = await User.findOne({ email: credentials.email });
      if (!user) {
        throw new Error("User not found");
      }
      const isPasswordCorrect = await bcrypt.compare(
        credentials.password,
        user.password
      );
      if (!isPasswordCorrect) {
        throw new Error("Wrong credentials");
      }
      return user;
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

const handler = NextAuth({
  providers,
  pages: {
    error: "/dashboard/login",
  },
});

export { handler as GET, handler as POST };
