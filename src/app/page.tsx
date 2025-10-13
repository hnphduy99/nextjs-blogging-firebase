'use client';
import Header from '@/components/layout/header';
import HomeBanner from '@/components/module/home/home-banner';
import HomeFeature from '@/components/module/home/home-feature';
import { Button } from '@/components/ui/button';
import { auth } from '@/firebase/firebase-config';
import { signOut } from 'firebase/auth';

export default function Home() {
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <div>
      <Header />
      <HomeBanner />
      <HomeFeature />
    </div>
  );
}
