import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import { DefaultSession, DefaultUser } from "next-auth"

// Extend the built-in User type
declare module "next-auth" {
  interface User extends DefaultUser {
    firstName?: string;
    lastName?: string;
    profileImage?: string;
  }
}

declare module "next-auth" {
  interface Session {
    user?: {
      firstName?: string
      lastName?: string
      profileImage?: string
    } & DefaultSession["user"]
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const connection = await mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        });

        const [rows] = await connection.execute(
          'SELECT * FROM users WHERE email = ?',
          [credentials.email]
        ) as any;

        await connection.end();

        if (rows.length === 0) {
          return null;
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return { 
          id: user.id, 
          firstName: user.first_name, 
          lastName: user.last_name, 
          email: user.email 
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.profileImage = user.profileImage || '/images/default-img.jpg';
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user?.id ?? null,
        },
      };
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
});