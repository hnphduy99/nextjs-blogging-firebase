import { SignUpForm } from '@/components/auth/sign-up-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Next Blog'
};

export default function SignUpPage() {
  return (
    <div className='min-h-svh p-10'>
      <SignUpForm />
    </div>
  );
}
