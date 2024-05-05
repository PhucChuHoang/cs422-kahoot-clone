'use client';

import React, { useState } from 'react';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Logo } from './logo';
import { Button } from './ui/button';

import Link from 'next/link';

export const LandingHeaderForm = () => {
    return (
      <div className="w-full h-20 bg-white sticky top-0 border border-white">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Logo />
            <ul className="flex md:flex md:flex-grow justify-end gap-x-6 text-gray-400 font-bold relative right-6">
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
            <Button className="flex font-bold hover:bg-yellow-500 text-yellow-400 bg-transparent border-2 border-yellow-400 ">Login</Button>
          </div>
        </div>
      </div>
    );
}