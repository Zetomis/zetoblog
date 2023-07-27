import Link from "next/link";
import { BlogInterface } from "../libs/types";
import { UsernameWidget } from "./UserWidget";

const BlogWidget = ({ blog }: { blog: BlogInterface }) => {
    return (
        <Link
            href={`/blog/${blog.id}`}
            className="px-4 py-2 border border-dark-shade rounded"
        >
            <h1 className="font-semibold text-xl">{blog.title}</h1>
            <div className="flex justify-start text-left">
                <UsernameWidget userId={blog.userId} />
            </div>
        </Link>
    );
};

export default BlogWidget;
