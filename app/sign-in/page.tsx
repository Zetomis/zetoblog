"use client";

import { signIn, useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            router.push("/");
        }
    }, [session]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        signIn("credentials", {
            email: email,
            password: password,
        });
    };

    return (
        <div className="border border-dark-shade rounded small_container">
            <h1 className="form_head">Sign In</h1>
            <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="email" className="label">
                    Email:
                </label>
                <input
                    type="text"
                    id="email"
                    placeholder="Enter Email..."
                    required
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <label htmlFor="password" className="label">
                    Password:
                </label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter Password..."
                    required
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                {error && <span className="error">{error}</span>}
                <button type="submit" className="button_submit">
                    Sign In
                </button>
            </form>
            <div className="py-2 flex items-center gap-x-2">
                <span className="flex-1 w-full h-1 bg-light-accent"></span>
                <h1 className="font-semibold text-light-accent">OR</h1>
                <span className="flex-1 w-full h-1 bg-light-accent"></span>
            </div>
            <div className="flex justify-center">
                <button
                    className="button_auth"
                    onClick={() => signIn("google")}
                >
                    Sign In with Google
                </button>
            </div>
        </div>
    );
};

export default SignIn;
