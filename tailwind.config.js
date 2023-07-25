/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "light-shade": "#F5F4EE",
                "light-accent": "#837987",
                "main-color": "#82A5BB",
                "dark-accent": "#48776E",
                "dark-shade": "#26222F",
            },
        },
    },
    plugins: [],
};
