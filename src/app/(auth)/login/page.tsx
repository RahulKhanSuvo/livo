import { AuthShell } from '@/components/auth/auth-shell';
import { SignInForm } from '@/components/auth/signin-form';

export default function LoginPage() {
  return (
    <AuthShell mode="signin">
      <SignInForm />
    </AuthShell>
  );
}
