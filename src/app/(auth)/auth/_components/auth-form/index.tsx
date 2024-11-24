"use client";

import React from "react";
import { SignInForm } from "../sign-in-form";
import { SignUpForm } from "../sign-up-form";

interface Props {
  className?: string;
}

export const AuthForm: React.FC<Props> = ({}) => {
  const [isSignIn, setIsSignIn] = React.useState<boolean>(true);

  const handleFormSwitch = () => {
    setIsSignIn(!isSignIn);
  };

  return isSignIn ? (
    <SignInForm onSwitch={handleFormSwitch} />
  ) : (
    <SignUpForm onSwitch={handleFormSwitch} />
  );
};
