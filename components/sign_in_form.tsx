'use client';

import React, { useState } from 'react';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader } from './ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Spinner } from '@nextui-org/spinner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthenticationService } from '@/services/AuthenticationService';
import { useDispatch } from 'react-redux';
import { setLogin, setToken, setUsername } from '@/lib';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';

const formSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export const SignInForm = () => {
  // When submit, change state to prevent multiple submissions
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const authenticationService = AuthenticationService.getInstance();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await authenticationService.login({
        username: data.username,
        password: data.password,
      });
      Cookies.set('token', response, { expires: 30 });
      Cookies.set('username', data.username, { expires: 30 });
      dispatch(setLogin(true));
      dispatch(setToken(response));
      dispatch(setUsername(data.username));
      router.replace('/home');
    } catch (error) {
      toast.error('Login failed. Please check your username and password.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: '#f56565',
          color: '#fff',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col">
      <ToastContainer />
      <p className="mb-10 text-center text-4xl font-semibold text-secondary">
        Welcome to Kahoot Clone
      </p>
      <Card className="border-2 border-secondary">
        <CardContent>
          <CardHeader className="items-center ">
            <h1 className="text-2xl font-semibold text-secondary">Login</h1>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="text-base text-secondary">
                      username
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-base"
                        id="username"
                        type="username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-secondary">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-base"
                        id="password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="mt-4 w-full items-center justify-center border-2 border-primary bg-background text-base"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <Spinner className="mr-2 h-4 w-4 animate-spin bg-secondary" />
                )}
                Login
              </Button>
            </form>
          </Form>
          <Button
            className="mt-4 w-full items-center justify-center border-2 border-primary bg-background text-base"
            type="button"
            disabled={isSubmitting}
          >
            <Link href="sign-up" className="text-secondary">
              Don&apos;t have an account? Sign up here
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
