import Heading from '@/components/layout/heading';
import PostFeatureItem from '../post/post-feature-item';

export default function HomeFeature() {
  return (
    <div className='home-block mb-10'>
      <div className='container'>
        <Heading className='text-3xl font-bold'>Features</Heading>
        <div className='grid-layout'>
          <PostFeatureItem />
          <PostFeatureItem />
          <PostFeatureItem />
        </div>
      </div>
    </div>
  );
}
