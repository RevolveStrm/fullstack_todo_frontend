'use client';

import { Input } from '@/components/input';
import { signUp } from '@/domains/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { SignUpData, signUpSchema } from './constants';

interface Props {
  className?: string;
  onSwitch: VoidFunction;
}

export const SignUpForm: React.FC<Props> = ({ onSwitch }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { formState, register, handleSubmit } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    reValidateMode: 'onChange',
  });

  console.log(formState.errors);

  const onSubmit = async (data: SignUpData) => {
    try {
      setLoading(true);

      await signUp(data);

      setLoading(false);

      toast.success(`Successfully signed up! Please, use your credentials to sign in.`);

      onSwitch();
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-center">Create an account</h2>

      <p className="text-gray-500 text-center">Enter your email and password to create account</p>

      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="email">Email</label>
        <Input
          {...register('email')}
          id="email"
          placeholder="Enter your email"
          error={formState.errors.email?.message}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <Input
          {...register('password')}
          id="password"
          type="password"
          placeholder="Enter your password"
          error={formState.errors.password?.message}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password">Confirm password</label>
        <Input
          {...register('confirmPassword')}
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          error={formState.errors.confirmPassword?.message}
        />
      </div>

      <p className="text-gray-500 text-center mt-4">
        Already have an account?
        <span onClick={onSwitch} className="text-black dark:text-white ml-1 cursor-pointer">
          Go to sign in!
        </span>
      </p>

      <button
        type="submit"
        className="bg-black text-white dark:bg-white dark:text-black p-1 rounded-md font-semibold"
      >
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>
    </form>
  );
};
