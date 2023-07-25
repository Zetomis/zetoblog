import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async (
    req: Request,
    { params }: { params: { blogId: string } }
) => {
    const blog = await prisma.blog.findUnique({
        where: {
            id: params.blogId,
        },
    });

    if (blog) {
        return new Response(JSON.stringify(blog), { status: 200 });
    } else {
        return new Response(JSON.stringify("Blog is not founed"), {
            status: 404,
        });
    }
};
