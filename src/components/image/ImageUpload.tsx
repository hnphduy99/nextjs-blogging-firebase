import React, { Fragment } from 'react';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { Spinner } from '../ui/spinner';

interface ImageUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  loading?: boolean;
  image?: string;
  handleDeleteImage?: () => void;
}

export default function ImageUpload({
  name,
  className,
  image,
  loading = false,
  handleDeleteImage,
  onChange,
  ...props
}: ImageUploadProps) {
  return (
    <Label
      className={cn(
        `group relative flex min-h-[200px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed ${props.disabled ? 'cursor-not-allowed' : ''}`,
        className
      )}
    >
      <Input type='file' name={name} className='hidden-input' onChange={onChange} {...props} />
      {loading && (
        <>
          <Spinner className='size-8' />
          <p>Loading...</p>
        </>
      )}
      {!image && !loading && (
        <div className='pointer-events-none flex flex-col items-center text-center'>
          <Image width={256} height={256} src='/img-upload.svg' alt='upload-img' className='mb-5 max-w-[80px]' />
          <p className='font-semibold'>Choose photo</p>
        </div>
      )}
      {image && !loading && (
        <Fragment>
          <Image
            src={image}
            alt={name}
            fill
            sizes='(max-width: 768px) 100vw, 33vw'
            priority
            className='h-full w-full object-cover'
          />
          <button
            type='button'
            className='invisible absolute z-10 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white text-red-500 opacity-0 transition-all group-hover:visible group-hover:opacity-100'
            onClick={handleDeleteImage}
          >
            <Trash2 />
          </button>
        </Fragment>
      )}
    </Label>
  );
}
