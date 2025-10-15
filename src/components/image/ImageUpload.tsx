import React, { Fragment } from 'react';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import Image from 'next/image';

interface ImageUploadProps {
  name: string;
  className?: string;
  progress?: number;
  image?: string;
  handleDeleteImage?: () => void;
}

export default function ImageUpload({
  name,
  className,
  progress = 0,
  image = '',
  handleDeleteImage
}: ImageUploadProps) {
  return (
    <Label
      className={cn(
        'group relative flex min-h-[200px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed',
        className
      )}
    >
      <Input type='file' name={name} className='hidden-input' onChange={() => {}} />
      {progress !== 0 && !image && (
        <div className='loading absolute z-10 h-16 w-16 animate-spin rounded-full border-8 border-green-500 border-t-transparent'></div>
      )}
      {!image && progress === 0 && (
        <div className='pointer-events-none flex flex-col items-center text-center'>
          <Image width={0} height={0} src='/img-upload.png' alt='upload-img' className='mb-5 max-w-[80px]' />
          <p className='font-semibold'>Choose photo</p>
        </div>
      )}
      {image && (
        <Fragment>
          <Image width={0} height={0} src={image} className='h-full w-full object-cover' alt='' />
          <button
            type='button'
            className='invisible absolute z-10 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white text-red-500 opacity-0 transition-all group-hover:visible group-hover:opacity-100'
            onClick={handleDeleteImage}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
              />
            </svg>
          </button>
        </Fragment>
      )}
      {!image && (
        <div
          className='image-upload-progress absolute bottom-0 left-0 h-1 w-10 bg-green-400 transition-all'
          style={{
            width: `${Math.ceil(progress)}%`
          }}
        />
      )}
    </Label>
  );
}
