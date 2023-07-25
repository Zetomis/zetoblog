"use client";

import { signIn, useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
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

        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, username, password }),
        });
        if (response.ok) {
            interface UserData {
                email: string;
                username: string;
                password: string;
            }
            const data = (await response.json()) as UserData;
            signIn("credentials", {
                email: data.email,
                password: data.password,
            });
        } else if (response.status === 403) {
            const error = await response.json();
            setError(error);
        }
    };

    return (
        <div className="border border-dark-shade rounded small_container">
            <h1 className="form_head">Register</h1>
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
                <label htmlFor="username" className="label">
                    Username:
                </label>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter Username..."
                    required
                    onChange={(e) => {
                        setUsername(e.target.value);
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
                    Register
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

export default Register;
