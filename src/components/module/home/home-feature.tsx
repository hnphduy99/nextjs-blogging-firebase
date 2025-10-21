import Heading from '@/components/layout/heading';
import PostFeatureItem from '../post/post-feature-item';
import { useEffect, useState } from 'react';
import { collection, limit, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/firebase/firebase-config';
import { IPosts } from '@/interfaces/posts.interface';

export default function HomeFeature() {
  const [posts, setPosts] = useState<IPosts[]>([]);

  const getPosts = async () => {
    const colRef = collection(db, 'posts');
    const q = query(colRef, where('hot', '==', true), where('status', '==', 1), limit(3));
    onSnapshot(q, (querySnapshot) => {
      const result: IPosts[] = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data()
        } as IPosts);
      });
      setPosts(result);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className='home-block mb-10'>
      <div className='container'>
        <Heading className='text-3xl font-bold'>Features</Heading>
        <div className='grid-layout'>
          {posts.map((post) => (
            <PostFeatureItem data={post} key={post.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
