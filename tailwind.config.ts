import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",  // srcディレクトリ内のすべてのファイルを対象
    "./pages/**/*.{js,ts,jsx,tsx}",  // pagesディレクトリ内のすべてのファイルを対象
    "./components/**/*.{js,ts,jsx,tsx}",  // componentsディレクトリ内のすべてのファイルを対象
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
