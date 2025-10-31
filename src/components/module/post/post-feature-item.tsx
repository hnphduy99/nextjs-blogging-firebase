import { db } from '@/firebase/firebase-config';
import { ICategory, IPosts, IUser } from '@/interfaces/posts.interface';
import { formatDateFirestore, slugify } from '@/lib/utils';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import PostCategory from './post-category';
import PostImage from './post-image';
import PostMeta from './post-meta';
import PostTitle from './post-title';

export default function PostFeatureItem({ data }: { data: IPosts }) {
  const [category, setCategory] = useState<ICategory>({} as ICategory);
  const [user, setUser] = useState<IUser>({} as IUser);

  useEffect(() => {
    async function getCategory() {
      const docRef = doc(db, 'categories', data.category_id!);
      const docSnap = await getDoc(docRef);
      if (!docSnap.data) return;
      setCategory(docSnap.data() as ICategory);
    }
    getCategory();
  }, [data.category_id]);

  useEffect(() => {
    async function getUser() {
      const docRef = doc(db, 'users', data.user_id!);
      const docSnap = await getDoc(docRef);
      if (!docSnap.data) return;
      setUser(docSnap.data() as IUser);
    }
    getUser();
  }, [data.user_id]);

  if (!data || !data.id) return null;

  return (
    <div className='post-feature-item relative h-[170px] w-full rounded-2xl lg:h-[270px]'>
      <PostImage src={data.image} className='h-full w-full rounded-2xl' alt='unsplash' />
      <div className='post-overlay absolute inset-0 rounded-2xl bg-[rgba(0,0,0,0.75)] opacity-60 mix-blend-multiply' />
      <div className='post-content absolute inset-0 z-10 p-5 text-white max-lg:p-[15px]'>
        <div className='post-top mb-4 flex items-center justify-between'>
          {category?.category && <PostCategory href={category.slug}>{category.category}</PostCategory>}
          <PostMeta
            href={slugify(user?.fullname || '')}
            date={formatDateFirestore(data.created_at, 'DD/MM/YYYY')}
            author={user.fullname}
          />
        </div>
        <PostTitle href={data.slug} className='text-[22px] max-lg:text-base'>
          {data.title}
        </PostTitle>
      </div>
    </div>
  );
}
