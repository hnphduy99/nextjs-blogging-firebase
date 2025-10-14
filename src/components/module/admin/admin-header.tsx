'use client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/auth-provider';
import Image from 'next/image';
import Link from 'next/link';

export function AdminHeader() {
  const { user } = useAuth();
  return (
    <div className='flex justify-between gap-5 border-b border-b-[#eee] bg-white p-5'>
      <Link href='/' className='logo flex items-center gap-5 text-lg font-semibold'>
        <Image src='/nextjs.svg' width={40} height={40} loading='lazy' alt='nextjs-blogging' className='max-w-10' />
        <span className='hidden lg:inline-block'>Next Blogging</span>
      </Link>
      <div className='header-right flex items-center gap-5'>
        <Link href='/manage/add-post'>
          <Button className='header-button h-[52px]'>Write new post</Button>
        </Link>
        <Link href='/profile' className='header-avatar h-[52px] w-[52px]'>
          <Image
            width={0}
            height={0}
            loading='lazy'
            sizes='100vw'
            className='h-full w-full rounded-full object-cover'
            src={user?.photoURL || '/no-avatar.jpg'}
            alt='avatar'
          />
        </Link>
      </div>
    </div>
  );
}
