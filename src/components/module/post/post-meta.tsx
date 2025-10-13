import { cn } from '@/lib/utils';
import Link from 'next/link';

interface PostMetaProps {
  className?: string;
  date: string;
  author: string;
  href?: string;
}

export default function PostMeta({ date = '', author = '', href = '', className }: PostMetaProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 text-sm font-semibold text-inherit max-lg:gap-[6px] max-lg:text-[10px]',
        className
      )}
    >
      <span className='post-time'>{date}</span>
      <span className='post-dot inline-block h-1 w-1 rounded-full bg-current' />
      <Link className='block' href={`/${href}`}>
        <span className='post-author'>{author}</span>
      </Link>
    </div>
  );
}
