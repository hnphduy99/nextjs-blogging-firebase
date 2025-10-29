'use client';
import { db } from '@/firebase/firebase-config';
import { useToast } from '@/hooks/useToast';
import { slugify } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CategoryForm from './category-form';

const formSchema = z.object({
  category: z.string().nonempty('Category is required'),
  slug: z.string().optional(),
  status: z.number().optional(),
  created_at: z.any().optional()
});

export default function CategoryNew() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      category: '',
      slug: '',
      status: 1,
      created_at: serverTimestamp()
    }
  });
  const toast = useToast();
  const { user } = useAuth();

  const addCategoryHandler = async (data: z.infer<typeof formSchema>) => {
    try {
      const cloneData = { ...data };
      cloneData.slug = slugify(data.slug || data.category);
      cloneData.status = Number(data.status);
      const colRef = collection(db, 'categories');
      await addDoc(colRef, {
        ...cloneData,
        user_id: user?.uid
      });
      toast.success('Category created successfully.');
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return <CategoryForm nameSubmitButton='Add category' form={form} submit={addCategoryHandler} />;
}
