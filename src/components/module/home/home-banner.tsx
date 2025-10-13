import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
  const carouselPlugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className='banner-style mb-[60px] px-0 py-10'>
      <Carousel
        opts={{ loop: true }}
        plugins={[carouselPlugin.current]}
        className='from-background to-foreground container flex h-full min-h-130 items-center bg-linear-to-tr'
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
                <img src={item.image} alt={item.heading} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
    // <div className='banner-style min-h-130 bg-linear-to-bl from-violet-500 to-fuchsia-500 px-0 py-10'>
    //   <div className='container'>
    //     <div className='banner flex items-center justify-between'>
    //       <div className='banner-content color-white max-w-[400px]'>
    //         <h1 className='banner-heading mb-5 text-4xl'>Heading</h1>
    //         <p className='banner-desc mb-10 leading-[1.75]'>
    //           Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod id repudiandae in, perspiciatis impedit
    //           nulla eligendi explicabo nemo ea soluta harum distinctio reprehenderit earum, ex fuga ducimus asperiores
    //           eum iure.
    //         </p>
    //         <Link href='/'>
    //           <Button size={'lg'}>Get Started</Button>
    //         </Link>
    //       </div>
    //       <div className='banner-image'>
    //         <img src='' alt='banner' />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
