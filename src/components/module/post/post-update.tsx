'use client';
import { db } from '@/firebase/firebase-config';
import { useToast } from '@/hooks/useToast';
import { IPosts } from '@/interfaces/posts.interface';
import { slugify } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import PostForm, { postFormSchema } from './post-form';

export default function PostUpdate({ postId }: { postId: string }) {
  const { user } = useAuth();
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<IPosts>();

  const updatePostHandler = async (data: z.infer<typeof postFormSchema>) => {
    try {
      setLoading(true);
      const cloneData = {
        ...data,
        updated_at: serverTimestamp(),
        slug: slugify(data.slug || data.title),
        user_id: user?.uid
      };
      const colRef = doc(db, 'posts', postId!);
      await updateDoc(colRef, cloneData);
      toast.success('Post created successfully.');
      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    const colRef = collection(db, 'categories');
    const q = query(colRef, where('status', '==', 1));
    const querySnapshot = await getDocs(q);
    const result: { value: string; label: string }[] = [];
    querySnapshot.forEach((doc) => {
      result.push({ value: doc.id, label: doc.data().name });
    });
    setCategories(result);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, 'posts', postId);
      const singleDoc = await getDoc(colRef);
      setPost(singleDoc.data() as IPosts);
    }
    fetchData();
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  return (
    <PostForm
      onSubmit={updatePostHandler}
      categories={categories}
      isSubmitting={loading}
      submitLabel='Update post'
      defaultValues={post}
    />
  );
}
