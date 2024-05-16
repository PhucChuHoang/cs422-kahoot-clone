'use client';

import React from 'react';
import { Logo } from './logo';
import { Button } from './ui/button';

import Link from 'next/link';

export const LandingHeaderForm = () => {
  return (
    <div className="sticky top-0 h-20 w-full border border-white bg-white">
      <div className="container mx-auto h-full px-4">
        <div className="flex h-full items-center justify-between">
          <Logo />
          <ul className="relative right-6 flex justify-end gap-x-6 font-bold text-gray-400 md:flex md:flex-grow">
            <li>
              <Link href="/help">
                <p>How it works?</p>
              </Link>
            </li>
            <li>
              <Link href="/feature">
                <p>Features</p>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <p>About us</p>
              </Link>
            </li>
          </ul>
          <Link href="/login">
            <Button className="flex border-2 border-primary bg-transparent font-bold text-primary hover:bg-yellow-500 ">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
