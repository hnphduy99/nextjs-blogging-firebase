import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ReactNode } from 'react';

interface PostCategoryProps {
  children: ReactNode;
  className?: string;
  href?: string;
}

export default function PostCategory({ children, className, href = '' }: PostCategoryProps) {
  return (
    <div
      className={cn(
        'post-category inline-block rounded-lg bg-[#f3f3f3] px-2.5 py-1 text-sm font-semibold whitespace-nowrap text-[#6b6b6b]',
        className
      )}
    >
      <Link className='block' href={`/${href}`}>
        {children}
      </Link>
    </div>
  );
}
