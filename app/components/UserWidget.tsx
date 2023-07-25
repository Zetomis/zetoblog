import Link from "next/link";
import useUser from "../hooks/useUser";

export const UsernameWidget = ({ userId }: { userId: string }) => {
    const { user, isLoading, error } = useUser(userId);

    if (isLoading) {
        return (
            <div>
                <h1>... Loading Username</h1>
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
        <div className="text-center">
            <span>Created By: </span>
            <Link
                href={`/user/${user?.id}`}
                className="font-semibold underline text-sm"
            >
                {user?.username}
            </Link>
        </div>
    );
};
