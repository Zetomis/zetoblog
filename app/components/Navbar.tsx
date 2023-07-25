"use client";

import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRef, useState } from "react";
import OptionDropdown from "./OptionDropdown";

const Navbar = () => {
    const [isToggle, setIsToggle] = useState(false);
    const { data: session } = useSession();

    const gearRef = useRef<HTMLButtonElement>(null);

    return (
        <div className="fixed top-0 left-0 right-0 bg-dark-shade z-10 h-16">
            <div className="container flex justify-between items-center h-full">
                <Link
                    href={"/"}
                    className="font-semibold text-light-shade text-xl underline"
                >
                    ZetoBlog
                </Link>
                <div className="flex items-center gap-x-4 relative">
                    {session ? (
                        <>
                            <Link href={"/create"} className="button_create">
                                Create
                            </Link>
                            <button
                                className="button_default"
                                onClick={() => setIsToggle((before) => !before)}
                                ref={gearRef}
                            >
                                <FontAwesomeIcon icon={faGear} />
                            </button>
                            {isToggle && (
                                <OptionDropdown
                                    setIsToggle={setIsToggle}
                                    gearRef={gearRef}
                                />
                            )}
                        </>
                    ) : (
                        <>
                            <Link href={"/register"} className="button_default">
                                Register
                            </Link>
                            <Link href={"/sign-in"} className="button_default">
                                Sign In
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
