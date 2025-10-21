'use client';
import Header from '@/components/layout/header';
import HomeBanner from '@/components/module/home/home-banner';
import HomeFeature from '@/components/module/home/home-feature';

export default function Home() {
  return (
    <div>
      <Header />
      <main className='minmd:px-6 minlg:max-w-[1440px] minlg:mx-auto minlg:grid-cols-[1fr_300px] minxl:grid-cols-[280px_1fr_300px] minlg:gap-x-14 minxl:gap-x-10 minlg:pb-20 grid w-full px-4 pt-20 pb-6'>
        <HomeBanner />
        <HomeFeature />
      </main>
    </div>
  );
}
