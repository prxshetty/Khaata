import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { db } from '../../../lib/db';
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const { name, email, image } = user;
        try {
          const result = await db.query(
            'INSERT INTO users (name, email, image) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET name = $1, image = $3 RETURNING *',
            [name, email, image]
          );
          user.id = result.rows[0].id;
        } catch (error) {
          console.error('Error updating user in database:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
  // ... other configuration options ...
});