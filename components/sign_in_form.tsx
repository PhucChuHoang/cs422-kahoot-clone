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
// import { Spinner } from '@nextui-org/spinner';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import { signIn, useSession } from 'next-auth/react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const formSchema = z.object({
  email: z.string().email().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export const SignInForm = () => {
  // When submit, change state to prevent multiple submissions
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const router = useRouter();

  // if (session) {
  //   // Route to main page if user is already signed in
  //   // router.push('');
  // }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // TODO: Sign in user
    // TODO: Redirect to dashboard
    console.log('Sign in user');
    console.log(data);
  }

  return (
    <div className="flex flex-col">
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
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="text-base text-secondary">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-base"
                        id="email"
                        type="email"
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
                {/* {isSubmitting && (
                  <Spinner className="mr-2 h-4 w-4 animate-spin" />
                )} */}
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
          <GoogleOAuthProvider clientId="312565890120-vsl70e24537ll8vk4qivrb20colu0ob0.apps.googleusercontent.com">
            <div className="relative mb-4 mt-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <GoogleLogin
                onSuccess={() => {
                  console.log('Google login success');
                  // do sth
                }}
                onError={() => {
                  console.error('Google login error');
                }}
              />
            </div>
          </GoogleOAuthProvider>
        </CardContent>
      </Card>
    </div>
  );
};
