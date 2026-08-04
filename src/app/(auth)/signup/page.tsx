import { AuthShell } from '@/components/auth/auth-shell';
import { SignUpForm } from '@/components/auth/signup-form';
import { signUpAction } from '@/components/auth/auth-actions';

export default function SignupPage() {
  return (
    <AuthShell mode="signup">
      <SignUpForm action={signUpAction} />
    </AuthShell>
  );
}
