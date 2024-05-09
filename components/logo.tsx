'use-client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Logo = () => {
  const [width] = useState(0);

  return (
    <>
      <Link href="/">
        <Image
          src="/image/Kahoot_Logo.png"
          alt="Logo"
          width={width < 1024 ? '150' : '250'}
          height={width < 1024 ? '45' : '74'}
          className="relative"
        />
      </Link>
    </>
  );
};

export { Logo };
