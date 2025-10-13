import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ReactNode } from 'react';

interface PostTitleProps {
  children: ReactNode;
  className?: string;
  href?: string;
}

export default function PostTitle({ children, href = '', className }: PostTitleProps) {
  return (
    <h3 className={cn('post-title mb-2 block text-base leading-normal font-bold', className)}>
      <Link className='block' href={`/${href}`}>
        {children}
      </Link>
    </h3>
  );
}
