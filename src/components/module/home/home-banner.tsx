import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

const ImageBanner = [
  {
    id: 1,
    image: '/image-banner1.png',
    heading: 'Image Banner 1',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos est, illum necessitatibus accusamus velit excepturi tempora similique non cupiditate odio dolorem magnam reiciendis ex esse nesciunt culpa error eos possimus?',
    linkDirect: ''
  },
  {
    id: 2,
    image: '/image-banner2.png',
    heading: 'Image Banner 2',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos est, illum necessitatibus accusamus velit excepturi tempora similique non cupiditate odio dolorem magnam reiciendis ex esse nesciunt culpa error eos possimus?',
    linkDirect: ''
  },
  {
    id: 3,
    image: '/image-banner3.png',
    heading: 'Image Banner 3',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos est, illum necessitatibus accusamus velit excepturi tempora similique non cupiditate odio dolorem magnam reiciendis ex esse nesciunt culpa error eos possimus?',
    linkDirect: ''
  },
  {
    id: 4,
    image: '/image-banner4.png',
    heading: 'Image Banner 4',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos est, illum necessitatibus accusamus velit excepturi tempora similique non cupiditate odio dolorem magnam reiciendis ex esse nesciunt culpa error eos possimus?',
    linkDirect: ''
  }
];

export default function HomeBanner() {
  const carouselPlugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <div className='banner-style mb-[60px] px-0 py-10'>
      <Carousel
        opts={{ loop: true }}
        plugins={[carouselPlugin.current]}
        className='from-background to-foreground container flex min-h-130 items-center bg-linear-to-tr'
        onMouseEnter={carouselPlugin.current.stop}
        onMouseLeave={carouselPlugin.current.reset}
      >
        <CarouselContent className='h-full'>
          {ImageBanner.map((item) => (
            <CarouselItem key={item.id} className='flex items-center justify-between'>
              <div className='banner-content color-white max-w-[600px]'>
                <h1 className='banner-heading mb-5 text-4xl font-bold'>{item.heading}</h1>
                <p className='banner-desc mb-10 leading-[1.75]'>{item.content}</p>
                <Link href='/'>
                  <Button className='cursor-pointer' size={'lg'}>
                    Get Started
                  </Button>
                </Link>
              </div>
              <div className='banner-image'>
                <Image
                  src={item.image}
                  alt={item.heading}
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='h-auto w-auto'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
