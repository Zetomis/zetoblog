import Link from "next/link";
import { signOut } from "next-auth/react";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from "react";

const OptionDropdown = ({
    setIsToggle,
    gearRef,
}: {
    setIsToggle: Dispatch<SetStateAction<boolean>>;
    gearRef: RefObject<HTMLButtonElement>;
}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                if (
                    gearRef.current &&
                    gearRef.current.contains(event.target as Node)
                ) {
                    setIsToggle(true);
                    return;
                }
                setIsToggle(false);
            }
        };

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    });

    return (
        <div
            className="absolute right-0 top-full px-4 py-2 rounded bg-light-shade border border-dark-shade flex flex-col gap-y-2 text-right mt-2 z-20"
            ref={dropdownRef}
        >
            <Link href={"/profile"}>Profile</Link>
            <button className="button_submit" onClick={() => signOut()}>
                Logout
            </button>
        </div>
    );
};

export default OptionDropdown;
