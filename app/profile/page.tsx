"use client";

import { useSession } from "next-auth/react";
import useUser from "../hooks/useUser";
import DisplayUser from "../components/DisplayUser";

const ProfilePage = () => {
    const { user, isLoading, error } = useUser("", true);
    const { data: session } = useSession();

    if (!session) {
        return (
            <div>
                <h1>Sign In First</h1>
            </div>
        );
    }

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
            <DisplayUser user={user} />
        </div>
    );
};

export default ProfilePage;
