'use client';
import Header from '@/components/layout/header';
import HomeBanner from '@/components/module/home/home-banner';
import HomeFeature from '@/components/module/home/home-feature';

export default function Home() {
  return (
    <div>
      <Header />
      <HomeBanner />
      <HomeFeature />
    </div>
  );
}
