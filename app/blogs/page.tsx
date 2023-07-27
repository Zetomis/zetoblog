"use client";

import { useEffect } from "react";
import useBlogs from "../hooks/useBlogs";
import BlogWidget from "../components/BlogWidget";
import PageWidget from "../components/PageWidget";

const BlogsPage = ({
    searchParams,
}: {
    searchParams: { p: number | null };
}) => {
    const { blogs, amount, isLoading, error } = useBlogs(searchParams.p);

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
        <div className="grid gap-y-4">
            {blogs.map((blog) => (
                <BlogWidget blog={blog} />
            ))}
            <PageWidget page={searchParams.p || 1} amount={amount} />
        </div>
    );
};

export default BlogsPage;
