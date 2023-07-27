import { useEffect, useState } from "react";
import { UserInterface } from "../libs/types";
import { useSession } from "next-auth/react";

const useUser = (userId?: string, currentUser: boolean = false) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<UserInterface>();

    useEffect(() => {
        const getUser = async () => {
            setIsLoading(true);
            setError(null);

            const URLEndpoint = `${
                currentUser ? `/api/user/current ` : `/api/user/${userId}`
            }`;

            const response = await fetch(URLEndpoint);
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

        if (userId || currentUser) {
            getUser();
        }
    }, [userId, currentUser]);

    return { user, isLoading, error };
};

export default useUser;
