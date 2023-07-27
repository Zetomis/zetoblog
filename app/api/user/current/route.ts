import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
const prisma = new PrismaClient();

export const GET = async (req: Request) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response(JSON.stringify("Sign In First"), { status: 403 });
    }
    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    });
    if (!user) {
        return new Response(JSON.stringify("User is not found"), {
            status: 404,
        });
    }
    return new Response(JSON.stringify(user), { status: 200 });
};
