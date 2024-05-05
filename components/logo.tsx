"use-client";

import Image from "next/image";
import Link from "next/link";
import { Button } from './ui/button';
import { useState } from "react";

const Logo = () => {
    const [width, setWidth] = useState(0);

  const updateWidth = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
  };

    return (
        <>
            <Link href="/">
                <Image
                    src="/image/Kahoot_Logo.png"
                    alt="Logo"
                    width={width < 1024 ? "150" : "250"}
                    height={width < 1024 ? "45" : "74"}
                    className="relative"
            />
            </Link>
        </>
    );
}

export { Logo };