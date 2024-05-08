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
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email().min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Confirm password is required'),
});

formSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const SignUpForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // TODO: Sign up user
    // TODO: Redirect to dashboard or confirmation page
    console.log('Sign up user');
    console.log(data);
  }

  return (
    <div className="flex flex-col">
      <p className="mb-10 text-center text-4xl font-semibold text-secondary">
        Create an Account
      </p>
      <Card className="border-2 border-secondary">
        <CardContent>
          <CardHeader className="items-center ">
            <h1 className="text-2xl font-semibold text-secondary">Sign Up</h1>
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
                  <FormItem className="mb-4">
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-secondary">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-base"
                        id="confirmPassword"
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
                  <Spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign Up
              </Button>
            </form>
          </Form>
          <Button
            className="mt-4 w-full items-center justify-center border-2 border-primary bg-background text-base"
            type="button"
            disabled={isSubmitting}
          >
            <Link href="login" className="text-secondary">
              Already have an account? Login here
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
