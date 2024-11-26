import { Container } from "@/components/container";
import { Suspense } from "react";
import { AuthForm } from "./_components/auth-form";

export default function AuthPage() {
  return (
    <Container className="h-screen flex justify-center items-center">
      <Suspense>
        <AuthForm />
      </Suspense>
    </Container>
  );
}
