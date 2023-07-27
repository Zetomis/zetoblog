import { UserInterface } from "../libs/types";

const DisplayUser = ({ user }: { user: UserInterface | undefined }) => {
    if (!user) {
        return (
            <div>
                <h1>There is no such user</h1>
            </div>
        );
    }

    return (
        <div>
            <h1 className="font-bold text-2xl text-center">{user.username}</h1>
            <h2>All User's Blogs:</h2>
        </div>
    );
};

export default DisplayUser;
