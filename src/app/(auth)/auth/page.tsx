import { Container } from "@/components/container";
import { AuthForm } from "./_components/auth-form";

export default function AuthPage() {
  return (
    <Container className="h-screen flex justify-center items-center">
      <AuthForm />
    </Container>
  );
}
