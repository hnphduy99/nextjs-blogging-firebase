'use client';
import { db } from '@/firebase/firebase-config';
import { useToast } from '@/hooks/useToast';
import { ICategory } from '@/interfaces/posts.interface';
import { slugify } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import CategoryForm, { categoryFormSchema } from './category-form';

export default function CategoryUpdate({ categoryId }: { categoryId: string }) {
  const { user } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<ICategory>();

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, 'categories', categoryId!);
      const singleDoc = await getDoc(colRef);
      setCategory(singleDoc.data() as ICategory);
    }
    fetchData();
  }, [categoryId]);

  const updateCategoryHandler = async (data: z.infer<typeof categoryFormSchema>) => {
    try {
      setLoading(true);
      const cloneData = {
        ...data,
        slug: slugify(data.slug || data.name),
        updated_at: serverTimestamp(),
        user_id: user?.uid
      };
      const colRef = doc(db, 'categories', categoryId!);
      await updateDoc(colRef, cloneData);
      toast.success('Category updated successfully.');
      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!category) return <div>Loading...</div>;

  return <CategoryForm isSubmitting={loading} submitLabel='Update category' onSubmit={updateCategoryHandler} />;
}
