"use client";

import { Input } from "@/components/ui/input";
import { signUp } from "@/domains/auth";
import { ErrorHelpers } from "@/services/error/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SignUpData, signUpSchema } from "./constants";

interface Props {
  className?: string;
  onSwitch: VoidFunction;
}

export const SignUpForm: React.FC<Props> = ({ onSwitch }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { formState, register, handleSubmit } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: SignUpData) => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);

      await signUp(data);

      toast.success(
        "You've successfully signed up! Please log in with your credentials."
      );

      onSwitch();
    } catch (error) {
      console.log(error);
      const message: string | undefined = ErrorHelpers.getMessage(error);
      toast.error(message ?? "Could not sign up your account!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <h2 className="text-xl font-bold text-center">Create an account</h2>

      <p className="text-gray-500 text-center">
        Enter your email and password to create account
      </p>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col w-full">
          <label htmlFor="email">Email</label>
          <Input
            {...register("email")}
            id="email"
            placeholder="Enter your email"
            error={formState.errors.email?.message}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <Input
            {...register("password")}
            id="password"
            type="password"
            placeholder="Enter your password"
            error={formState.errors.password?.message}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Confirm password</label>
          <Input
            {...register("confirmPassword")}
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            error={formState.errors.confirmPassword?.message}
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-black text-white dark:bg-white dark:text-black p-1 rounded-md font-semibold"
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>

      <p className="text-gray-500 text-center mt-2">
        Already have an account?
        <span
          onClick={onSwitch}
          className="text-black dark:text-white ml-1 cursor-pointer"
        >
          Go to sign in!
        </span>
      </p>
    </form>
  );
};
