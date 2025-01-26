'use client';
import { signUpUser } from '@/actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6).max(50),
});

const SignUpForm: React.FC = ({}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const user = await signUpUser(values);
      console.log(user);
      return user;
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        if (error.message.includes('email')) {
          form.setError('email', {
            type: 'manual',
            message: error.message,
          });
        } else if (error.message.includes('password')) {
          form.setError('password', {
            type: 'manual',
            message: error.message,
          });
        } else {
          console.error(error);
        }
      } else {
        console.error(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="shadcn" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" variant={'secondary'} type="submit">
          Sign Up
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
