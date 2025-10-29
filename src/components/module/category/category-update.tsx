'use client';
import { db } from '@/firebase/firebase-config';
import { useToast } from '@/hooks/useToast';
import { slugify } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CategoryForm from './category-form';

const formSchema = z.object({
  category: z.string().nonempty('Category is required'),
  slug: z.string().optional(),
  status: z.number().optional(),
  created_at: z.any().optional()
});

export default function CategoryUpdate({ categoryId }: { categoryId: string }) {
  const toast = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      category: '',
      slug: '',
      status: undefined,
      created_at: undefined
    }
  });

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, 'categories', categoryId!);
      const singleDoc = await getDoc(colRef);
      form.reset(singleDoc.data());
    }
    fetchData();
  }, [categoryId, form]);

  const updateCategoryHandler = async (data: z.infer<typeof formSchema>) => {
    try {
      const cloneData = { ...data };
      cloneData.slug = slugify(data.slug || data.category);
      cloneData.status = Number(data.status);
      const colRef = doc(db, 'categories', categoryId!);
      await updateDoc(colRef, {
        ...cloneData,
        updated_at: serverTimestamp()
      });
      toast.success('Category updated successfully.');
      router.back();
    } catch (error) {
      console.log(error);
    }
  };
  if (!categoryId) return null;

  return <CategoryForm nameSubmitButton='Update category' form={form} submit={updateCategoryHandler} />;
}
