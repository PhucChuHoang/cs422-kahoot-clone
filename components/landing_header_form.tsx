'use client';

import React from 'react';
import { Logo } from './ui/logo';
import { Button } from './ui/button';

import Link from 'next/link';
import { setToken, setUsername, useAppSelector, useInitToken } from '@/lib';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { isTokenExpired } from '@/lib/utils';
import Cookies from 'js-cookie';

export const LandingHeaderForm = () => {
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const router = useRouter();
  useInitToken();

  const handleSignOut = () => {
    dispatch(setToken(undefined));
    dispatch(setUsername(undefined));
    Cookies.remove('token');
    Cookies.remove('username');
    router.replace('/');
  };

  if (!token || isTokenExpired(token)) {
    return (
      <div className="sticky top-0 h-20 w-full border border-white bg-white">
        <div className="container mx-auto h-full px-4">
          <div className="flex h-full items-center justify-between">
            <Logo />
            <ul className="relative right-6 flex justify-end gap-x-6 font-bold text-gray-400 md:flex md:flex-grow">
              <Link href="/sign-up">
                <Button className="border-gray flex border-2 bg-transparent font-bold text-black hover:bg-gray-500 hover:text-white">
                  Sign Up
                </Button>
              </Link>
            </ul>
            <Link href="/login">
              <Button className="flex border-2 border-primary bg-transparent font-bold text-primary hover:bg-yellow-500 hover:text-white">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-0 h-20 w-full border border-white bg-white">
      <div className="container mx-auto h-full px-4">
        <div className="flex h-full items-center justify-between">
          <Logo />
          <div className="flex">
            <Button className="mr-2" onClick={() => router.replace('/')}>
              Play
            </Button>
            <Button className="mr-2" onClick={() => router.replace('/home')}>
              Home
            </Button>
            <Button
              className="flex border-2 border-primary bg-transparent font-bold text-primary hover:bg-yellow-500 hover:text-white"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
