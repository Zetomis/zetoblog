import { useEffect, useState } from "react";
import { BlogInterface } from "../libs/types";

const useBlog = (blogId: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [blog, setBlog] = useState<BlogInterface>();

    useEffect(() => {
        const getUser = async () => {
            setIsLoading(true);
            setError(null);

            const response = await fetch(`/api/blog/${blogId}`);
            if (response.ok) {
                setIsLoading(false);
                const data = (await response.json()) as BlogInterface;
                setBlog(data);
            } else {
                setIsLoading(false);
                const data = await response.json();
                setError(data);
            }
        };

        if (blogId) {
            getUser();
        }
    }, [blogId]);

    return { blog, isLoading, error };
};

export default useBlog;
