import { AuthShell } from '@/components/auth/auth-shell';
import { SignUpForm } from '@/components/auth/signup-form';

export default function SignupPage() {
  return (
    <AuthShell mode="signup">
      <SignUpForm />
    </AuthShell>
  );
}
