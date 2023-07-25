import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async (
    req: Request,
    { params }: { params: { userId: string } }
) => {
    const user = await prisma.user.findUnique({
        where: {
            id: params.userId,
        },
        select: {
            id: true,
            email: true,
            username: true,
        },
    });

    if (user) {
        return new Response(JSON.stringify(user), { status: 200 });
    } else {
        return new Response(JSON.stringify("User is not founed"), {
            status: 404,
        });
    }
};
