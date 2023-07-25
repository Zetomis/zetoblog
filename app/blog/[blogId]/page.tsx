"use client";

import MarkdownOutput from "@/app/components/MardownOutput";
import { UsernameWidget } from "@/app/components/UserWidget";
import useBlog from "@/app/hooks/useBlog";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

function BlogPage({ params: { blogId } }: { params: { blogId: string } }) {
    const { blog, isLoading, error } = useBlog(blogId);

    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1>{error}</h1>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-center font-bold text-2xl block mb-4">
                {blog?.title}
            </h1>
            <UsernameWidget userId={blog?.userId ?? ""} />
            {blog?.content && (
                <ReactMarkdown className="mt-2 w-3/4 mx-auto prose">
                    {blog.content}
                </ReactMarkdown>
            )}
        </div>
    );
}

export default BlogPage;
