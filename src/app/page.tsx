'use client';
import { Button } from '@/components/ui/button';
import { auth } from '@/firebase/firebase-config';
import { signOut } from 'firebase/auth';

export default function Home() {
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <div>
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  );
}
