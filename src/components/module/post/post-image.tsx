import { Link } from 'lucide-react';

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
          <img src={src} alt={alt} loading='lazy' className={className} />
        </div>
      </Link>
    );
  return (
    <div className={className}>
      <img
        src={src}
        alt={alt}
        loading='lazy'
        style={{ borderRadius: 'inherit' }}
        className='h-full w-full object-cover'
      />
    </div>
  );
}
