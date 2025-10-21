import { db } from '@/firebase/firebase-config';
import { ICategory, IPosts } from '@/interfaces/posts.interface';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import PostCategory from './post-category';
import PostImage from './post-image';
import PostMeta from './post-meta';
import PostTitle from './post-title';

export default function PostFeatureItem({ data }: { data: IPosts }) {
  const [category, setCategory] = useState<ICategory>({} as ICategory);
  useEffect(() => {
    async function getCategory() {
      const docRef = doc(db, 'categories', data.category!);
      const docSnap = await getDoc(docRef);
      setCategory(docSnap.data() as ICategory);
    }
    getCategory();
  }, [data.category]);

  return (
    <div className='post-feature-item relative h-[170px] w-full rounded-2xl lg:h-[270px]'>
      <PostImage src={data.image} className='h-full w-full rounded-2xl' alt='unsplash' />
      <div className='post-overlay absolute inset-0 rounded-2xl bg-[rgba(0,0,0,0.75)] opacity-60 mix-blend-multiply' />
      <div className='post-content absolute inset-0 z-10 p-5 text-white max-lg:p-[15px]'>
        <div className='post-top mb-4 flex items-center justify-between'>
          {category?.name && (
            <PostCategory>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</PostCategory>
          )}
          <PostMeta date='01/01/2025' author={data.author} />
        </div>
        <PostTitle className='text-[22px] max-lg:text-base'>{data.title}</PostTitle>
      </div>
    </div>
  );
}
