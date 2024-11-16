'use client';

import React from 'react';
import { SignInForm } from '../sign-in-form';
import { SignUpForm } from '../sign-up-form';

interface Props {
  className?: string;
}

export const AuthForm: React.FC<Props> = ({}) => {
  const [isSignIn, setIsSignIn] = React.useState<boolean>(true);

  const handleFormSwitch = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="flex justify-center mt-20 mx-auto w-[720px]">
      {isSignIn ? (
        <SignInForm onSwitch={handleFormSwitch} />
      ) : (
        <SignUpForm onSwitch={handleFormSwitch} />
      )}
    </div>
  );
};
