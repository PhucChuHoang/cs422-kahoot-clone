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
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AuthenticationService } from '@/services/AuthenticationService';
import { setLogin } from '@/lib';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from '@nextui-org/spinner';

const formSchema = z.object({
  email: z.string().email().min(1, 'Email is required'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Confirm password is required'),
});

formSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const SignUpForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const authenticationService = AuthenticationService.getInstance();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await authenticationService.register({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      if (!response) {
        throw new Error('Failed to register');
      }
      dispatch(setLogin(true));
      router.replace('/home');
    } catch (error) {
      toast.error('Register failed. Please try again.', {
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
                name="username"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="text-base text-secondary">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-base"
                        id="username"
                        type="text"
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
                  <Spinner className="mr-2 h-4 w-4 animate-spin bg-secondary" />
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
