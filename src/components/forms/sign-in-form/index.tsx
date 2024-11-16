'use client';

import { Input } from '@/components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { SignInData, signInSchema } from './constants';

interface Props {
  className?: string;
  onSwitch: VoidFunction;
}

export const SignInForm: React.FC<Props> = ({ onSwitch }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInData) => {
    setLoading(true);
    const response = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    setLoading(false);

    if (!response?.ok) {
      return toast.error(`Could not sign in!`);
    }

    toast.success(`Successfully signed in!`);

    router.push('/tasks');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-center">Login into account</h2>

      <p className="text-gray-500 text-center">Enter your email and password below to login</p>

      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <Input {...register('email')} id="email" placeholder="Enter your email" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <Input
          {...register('password')}
          id="password"
          type="password"
          placeholder="Enter your password"
        />
      </div>

      <p className="text-gray-500 text-center mt-4">
        Does not have an account?
        <span onClick={onSwitch} className="text-black dark:text-white ml-1 cursor-pointer">
          Go to sign up!
        </span>
      </p>

      <button
        type="submit"
        className="bg-black text-white dark:bg-white dark:text-black p-1 rounded-md font-semibold"
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
};
