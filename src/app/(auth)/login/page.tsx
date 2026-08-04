import { AuthShell } from '@/components/auth/auth-shell';
import { SignInForm } from '@/components/auth/signin-form';
import { signInAction } from '@/components/auth/auth-actions';

export default function LoginPage() {
  return (
    <AuthShell mode="signin">
      <SignInForm action={signInAction} />
    </AuthShell>
  );
}
