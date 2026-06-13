import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        // Biarkan baris di bawah ini jika Anda tidak menggunakan folder src/
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0a0a0a",
                foreground: "#f3f4f6",
                "neon-cyan": "#00f3ff",
                "neon-cyan-dark": "#00b8c2",
            },
            boxShadow: {
                "neon-glow": "0 0 10px rgba(0, 243, 255, 0.5), 0 0 20px rgba(0, 243, 255, 0.3)",
                "neon-glow-hover": "0 0 15px rgba(0, 243, 255, 0.7), 0 0 30px rgba(0, 243, 255, 0.5)",
            },
        },
    },
    plugins: [],
};
export default config;