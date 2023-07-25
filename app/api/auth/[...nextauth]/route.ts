import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email:",
                    type: "email",
                    placeholder: "Enter Email...",
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "Enter Password...",
                },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email,
                    },
                });
                if (!user) throw new Error("Invalid email or password");
                if (!credentials?.password)
                    throw new Error("Invalid email or password");
                const isMatch = bcrypt.compare(
                    credentials?.password,
                    user.password!
                );
                if (!isMatch) throw new Error("Invalid email or password");
                return user;
            },
        }),
    ],
    callbacks: {
        async session({ session }) {
            const user = await prisma.user.findUnique({
                where: {
                    email: session.user.email,
                },
            });
            if (user) {
                session.user.username = user.username ?? "";
                session.user.id = user.id ?? "";
                session.user.email = user.email ?? "";
            }
            return session;
        },
        async signIn({ user }) {
            const currentUser = await prisma.user.findUnique({
                where: {
                    email: user.email ?? "",
                },
            });

            if (!currentUser) {
                await prisma.user.create({
                    data: {
                        email: user.email ?? "",
                        username: user.name ?? "",
                    },
                });
            }

            return true;
        },
    },
    secret: process.env.SECRET,
    pages: {
        signIn: "/sign-in",
    },
};

const handler = NextAuth(authOptions);
export { handler as POST, handler as GET };
