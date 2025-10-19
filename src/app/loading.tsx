'use client';

import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
  return (
    <div className='flex h-screen items-center justify-center gap-2 bg-slate-50 dark:bg-slate-800'>
      <Spinner className='size-8' />
      <p>Loading...</p>
    </div>
  );
}
