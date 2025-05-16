'use client';

import Image from "next/image"
import style from './Header.module.css'
import { useTheme } from "next-themes";
import { useState } from "react";


export default function Header() {
    const { theme, setTheme } = useTheme();
    const [darkMode, setDarkMode] = useState(false);

    const switchMode = () => {
        setTheme(theme == "dark" ? "light" : "dark");
        setDarkMode(!darkMode);
    }

    return (
        <header className={style.container}>
            <div>
                <h1>Blinded</h1>
                <Image
                    src="/Vector.png"
                    alt="logo"
                    width={50}
                    height={50}
                ></Image>
            </div>
            <div
                onClick={switchMode}
                className={darkMode ? "" : style.light}>

                <svg
                    id="darkMode"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="0 0 100 100"
                    fill="transparent"
                    width="100"
                    height="100"
                    stroke="currentColor"
                    strokeLinecap="round">
                    <path
                        fill="currentColor"
                        d="M50,.5C22.66.5.5,22.66.5,50s22.16,49.5,49.5,49.5,49.5-22.16,49.5-49.5S77.34.5,50,.5ZM50,89.64V10.36c21.89,0,39.64,17.74,39.64,39.63s-17.75,39.64-39.64,39.64Z"
                    />
                </svg>
            </div>
        </header >
    )
}