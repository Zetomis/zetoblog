import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const POST = async (req: Request) => {
    const { email, username, password } = await req.json();
    try {
        const existedUser = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });

        if (existedUser) {
            return new Response(JSON.stringify("User already exists"), {
                status: 403,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            },
        });
        return new Response(JSON.stringify(newUser), { status: 200 });
    } catch {
        return new Response(JSON.stringify("Server Error"), { status: 500 });
    }
};
