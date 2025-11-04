'use client';
import { db } from '@/firebase/firebase-config';
import { useToast } from '@/hooks/useToast';
import { slugify } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { z } from 'zod';
import CategoryForm, { categoryFormSchema } from './category-form';

export default function CategoryNew() {
  const toast = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const addCategoryHandler = async (data: z.infer<typeof categoryFormSchema>) => {
    try {
      setLoading(true);
      const cloneData = {
        ...data,
        slug: slugify(data.slug || data.name),
        created_at: serverTimestamp(),
        user_id: user?.uid
      };
      const colRef = collection(db, 'categories');
      await addDoc(colRef, cloneData);
      toast.success('Category created successfully.');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return <CategoryForm isSubmitting={loading} submitLabel='Add category' onSubmit={addCategoryHandler} />;
}
