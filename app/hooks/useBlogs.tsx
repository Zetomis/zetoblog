import { useEffect, useState } from "react";
import { BlogInterface } from "../libs/types";

const useBlogs = (page: number | null) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [blogs, setBlogs] = useState<BlogInterface[]>([]);
    const [amount, setAmount] = useState(0);

    interface DataInterface {
        blogs: BlogInterface[];
        amount: number;
    }

    useEffect(() => {
        const getBlogs = async () => {
            setIsLoading(true);
            setError(null);

            const response = await fetch(`/api/blogs/${page || 1}`);

            if (response.ok) {
                setIsLoading(false);
                const data = (await response.json()) as DataInterface;
                setBlogs(data.blogs);
                setAmount(data.amount);
            } else {
                setIsLoading(false);
                const data = await response.json();
                setError(data);
            }
        };

        getBlogs();
    }, [page]);

    return { blogs, amount, isLoading, error };
};

export default useBlogs;
