import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (req: Request) => {
    const { title, content } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response(JSON.stringify("User is invalid"), { status: 401 });
    }

    const blog = await prisma.blog.create({
        data: {
            content: content,
            userId: session.user.id,
            title: title,
        },
    });

    return new Response(JSON.stringify(blog), { status: 200 });
};
