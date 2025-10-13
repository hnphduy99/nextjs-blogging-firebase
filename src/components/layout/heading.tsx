import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
  className?: string;
}

export default function Heading({ className, children }: HeadingProps) {
  return (
    <h2
      className={cn(
        'before:content:[""] relative mb-[30px] text-[28px] text-[#3A1097] before:absolute before:top-0 before:left-0 before:h-1 before:w-[50px] before:-translate-y-[150%] before:bg-[#00D1ED]',
        className
      )}
    >
      {children}
    </h2>
  );
}
