"use client";

import Link from "next/link";
import MarkdownInput from "../components/MarkdownInput";
import { useState } from "react";
import MarkdownOutput from "../components/MardownOutput";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreatePage = () => {
    const [blogContent, setBlogContent] = useState("");
    const [error, setError] = useState<string | null>(null);

    const { data: session } = useSession();
    const router = useRouter();

    if (!session) {
        return (
            <div>
                <h1 className="text-center font-bold text-xl">
                    Sign In to Continue
                </h1>
            </div>
        );
    }

    const handleCreateBlog = async () => {
        const response = await fetch("/api/blog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: blogContent,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            router.push(`/blog/${data.id}`);
        } else {
            const error = await response.json();
            setError(error);
        }
    };

    return (
        <div>
            <h1 className="font-bold text-center text-2xl mb-2 block">
                Markdown Editor
            </h1>
            <a
                href="https://www.markdownguide.org/basic-syntax/"
                className="text-main-color text-center font-semibold mb-4 block underline"
            >
                Here is a Markdown guide
            </a>
            <div className="grid grid-cols-2 gap-x-2 mb-8">
                <div>
                    <h1>Markdown Input</h1>
                    <MarkdownInput setBlogContent={setBlogContent} />
                </div>
                <div>
                    <h1>Markdown Output</h1>
                    <MarkdownOutput blogContent={blogContent} />
                </div>
            </div>
            <button className="button_submit w-full" onClick={handleCreateBlog}>
                Create Blog
            </button>
        </div>
    );
};

export default CreatePage;
