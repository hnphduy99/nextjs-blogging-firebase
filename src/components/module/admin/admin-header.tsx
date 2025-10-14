'use client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/auth-provider';
import Link from 'next/link';

export function AdminHeader() {
  const { user } = useAuth();
  return (
    <div className='flex justify-between gap-5 border-b border-b-[#eee] bg-white p-5'>
      <Link href='/' className='logo flex items-center gap-5 text-lg font-semibold'>
        <img srcSet='/nextjs.svg 2x' alt='nextjs-blogging' className='max-w-10' />
        <span className='hidden lg:inline-block'>Next Blogging</span>
      </Link>
      <div className='header-right flex items-center gap-5'>
        <Link href='/manage/add-post'>
          <Button className='header-button h-[52px]'>Write new post</Button>
        </Link>
        <Link href='/profile' className='header-avatar h-[52px] w-[52px]'>
          <img className='h-full w-full rounded-full object-cover' src={user?.photoURL || ''} alt='' />
        </Link>
      </div>
    </div>
  );
}
