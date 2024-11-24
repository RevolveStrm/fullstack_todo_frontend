"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  BAD_CREDENTIALS_AUTH_ERROR,
  SignInData,
  signInSchema,
} from "./constants";

interface Props {
  className?: string;
  onSwitch: VoidFunction;
}

export const SignInForm: React.FC<Props> = ({ onSwitch }) => {
  const router = useRouter();
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, formState } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: SignInData) => {
    try {
      setLoading(true);

      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (!response || !response.ok) {
        throw response?.error;
      }

      toast.success("Welcome back! You have successfully signed in.");

      router.push("/tasks");
    } catch (error) {
      const message: string =
        error === BAD_CREDENTIALS_AUTH_ERROR
          ? "Invalid email or password. Please try again."
          : "An error occurred while signing in. Please try again later.";
      toast.error(message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold text-center">Login into account</h2>

      <p className="text-gray-500 text-center">
        Enter your email and password below to login
      </p>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <Input
            {...register("email")}
            id="email"
            placeholder="Enter your email"
            error={formState.errors.email?.message}
          />
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="password">Password</label>
          <Input
            {...register("password")}
            id="password"
            type={isPasswordShown ? "text" : "password"}
            placeholder="Enter your password"
            error={formState.errors.password?.message}
          />
          <div
            className="absolute right-2 bottom-6 bg-white dark:bg-black px-1 cursor-pointer"
            onClick={() => setIsPasswordShown(!isPasswordShown)}
          >
            {isPasswordShown ? <Eye /> : <EyeClosed />}
          </div>
        </div>

        <Link href={"/auth"}>
          <p className="text-gray-500 text-sm text-right cursor-pointer">
            Forgot your password?
          </p>
        </Link>
      </div>

      <Button
        type="submit"
        className="bg-black text-white dark:bg-white dark:text-black p-1 rounded-md font-semibold mt-2"
      >
        {loading ? "Signing In ..." : "Sign In"}
      </Button>

      <p className="text-gray-500 text-center mt-2">
        Does not have an account?
        <span
          onClick={onSwitch}
          className="text-black dark:text-white ml-1 cursor-pointer"
        >
          Go to sign up!
        </span>
      </p>
    </form>
  );
};
