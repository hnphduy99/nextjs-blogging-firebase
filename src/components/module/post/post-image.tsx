import { Link } from 'lucide-react';
import Image from 'next/image';

interface PostImageProps {
  src: string;
  alt: string;
  className?: string;
  href?: string;
}

export default function PostImage({ src = '', alt = '', className, href = '' }: PostImageProps) {
  if (href)
    return (
      <Link href={`/${href}`} className='block'>
        <div className={className}>
          <Image width={300} height={300} src={src} alt={alt} loading='lazy' className={className} />
        </div>
      </Link>
    );
  return (
    <div className={className}>
      <Image
        width={300}
        height={300}
        src={src}
        alt={alt}
        loading='lazy'
        style={{ borderRadius: 'inherit' }}
        className='h-full w-full object-cover'
      />
    </div>
  );
}
