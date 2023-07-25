import { Metadata } from "next";
import { ReactNode } from "react";

import "./globals.css";
import Navbar from "./components/Navbar";
import AuthProvider from "./components/AuthProvider";

export const metadata: Metadata = {
    title: "ZetoBlog",
    description: "Zetoblog's Blog Website",
};

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en">
            <body className="bg-light-shade">
                <AuthProvider>
                    <Navbar />
                    <div className="mt-20 container">{children}</div>
                </AuthProvider>
            </body>
        </html>
    );
};

export default Layout;
