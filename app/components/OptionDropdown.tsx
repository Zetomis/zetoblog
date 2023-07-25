import Link from "next/link";
import { signOut } from "next-auth/react";

const OptionDropdown = () => {
    return (
        <div className="absolute right-0 top-full px-4 py-2 rounded bg-light-shade border border-dark-shade flex flex-col gap-y-2 text-right mt-2 z-20">
            <Link href={"/profile"}>Profile</Link>
            <button className="button_submit" onClick={() => signOut()}>
                Logout
            </button>
        </div>
    );
};

export default OptionDropdown;
