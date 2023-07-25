import { useEffect, useState } from "react";
import { UserInterface } from "../libs/types";

const useUser = (userId: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<UserInterface>();

    useEffect(() => {
        const getUser = async () => {
            setIsLoading(true);
            setError(null);

            const response = await fetch(`/api/user/${userId}`);
            if (response.ok) {
                setIsLoading(false);
                const data = (await response.json()) as UserInterface;
                setUser(data);
            } else {
                setIsLoading(false);
                const data = await response.json();
                setError(data);
            }
        };

        if (userId) {
            getUser();
        }
    }, [userId]);

    return { user, isLoading, error };
};

export default useUser;
