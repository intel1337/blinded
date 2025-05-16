"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const ThemeProvider = ({ children }) => (
    <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem={true}>
        {children}
    </NextThemesProvider>
);

export default ThemeProvider;