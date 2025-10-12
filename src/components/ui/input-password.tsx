'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from './input';
import { Eye, EyeOff } from 'lucide-react';

function InputPassword({ className, type, ref, ...props }: React.ComponentProps<'input'>) {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className='relative w-full'>
      <Input type={showPassword ? 'text' : 'password'} className={cn('pr-10', className)} ref={ref} {...props} />
      <button
        type='button'
        className='absolute right-3 z-10 h-full text-gray-500'
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={props.disabled}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
      </button>
    </div>
  );
}

export { InputPassword };
