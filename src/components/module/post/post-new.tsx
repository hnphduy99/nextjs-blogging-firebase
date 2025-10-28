'use client';
import ImageUpload from '@/components/image/ImageUpload';
import AdminHeading from '@/components/module/admin/admin-heading';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import { postStatus } from '@/constants/post';
import { db } from '@/firebase/firebase-config';
import { useToast } from '@/hooks/useToast';
import { extractPublicId, slugify } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().nonempty('Title is required'),
  slug: z.string().optional(),
  status: z.number().optional(),
  category_id: z.string().nonempty('Category is required'),
  image: z.string(),
  hot: z.boolean().optional(),
  created_at: z.any().optional()
});

export default function PostNew() {
  const { user } = useAuth();
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const toast = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      slug: '',
      status: 2,
      category_id: '',
      image: '',
      hot: false
    }
  });
  const image = useWatch({ name: 'image', control: form.control });

  const addPostHandler = async (data: z.infer<typeof formSchema>) => {
    try {
      const cloneData = { ...data };
      cloneData.slug = slugify(data.slug || data.title);
      cloneData.status = Number(data.status);
      cloneData.created_at = serverTimestamp() as object;
      const colRef = collection(db, 'posts');
      await addDoc(colRef, {
        ...cloneData,
        user_id: user?.uid
      });
      toast.success('Post created successfully.');
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const onSelectImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoadingImage(true);
      const file = e.target.files?.[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/api/upload', formData);
      form.setValue('image', res.data.url);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingImage(false);
    }
  };

  const handleDeleteImage = async () => {
    try {
      setIsLoadingImage(true);
      const publicId = extractPublicId(image);
      if (!publicId) return;
      await axios.delete(`/api/upload`, { data: { public_id: publicId } });
      form.setValue('image', '');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingImage(false);
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

  return (
    <div>
      <AdminHeading title='Add post' desc='Add new post' />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(addPostHandler)}>
          <div className='form-layout space-y-10'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='flex flex-col items-start gap-y-5'>
                  <FormLabel required htmlFor='title'>
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input id='title' placeholder='Enter your title' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='slug'
              render={({ field }) => (
                <FormItem className='flex flex-col items-start gap-y-5'>
                  <FormLabel htmlFor='slug'>Slug</FormLabel>
                  <FormControl>
                    <Input id='slug' placeholder='Enter your slug' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem className='flex flex-col items-start gap-y-5'>
              <FormLabel htmlFor='Image'>Image</FormLabel>
              <ImageUpload
                disabled={isLoadingImage}
                loading={isLoadingImage}
                name='image'
                handleDeleteImage={handleDeleteImage}
                image={image}
                onChange={onSelectImage}
                className='h-[250px]'
              />
            </FormItem>
            <FormField
              control={form.control}
              name='category_id'
              render={({ field }) => (
                <FormItem className='flex flex-col items-start gap-y-5'>
                  <FormLabel required htmlFor='Category'>
                    Category
                  </FormLabel>
                  <FormControl>
                    <Combobox
                      className='h-[60px]'
                      options={categories}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder='Select category'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='hot'
              render={({ field }) => (
                <FormItem className='flex flex-col items-start gap-y-5'>
                  <FormLabel htmlFor={field.name}>Hot</FormLabel>
                  <FormControl>
                    <Switch name={field.name} id={field.name} checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem className='flex flex-col items-start gap-y-5'>
                  <FormLabel htmlFor='status'>Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(val) => field.onChange(Number(val))}
                      defaultValue={String(field.value)}
                      className='flex h-[60px] w-full'
                    >
                      {postStatus.map((status) => (
                        <div key={status.value} className='flex items-center space-x-2'>
                          <RadioGroupItem value={String(status.value)} id={String(status.value)} />
                          <FormLabel
                            htmlFor={String(status.value)}
                            className='text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                          >
                            {status.label}
                          </FormLabel>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={form.formState.isSubmitting} type='submit' className='mx-auto block h-15 min-w-80 p-5'>
            {form.formState.isSubmitting ? (
              <div className='flex justify-center align-middle'>
                <Spinner className='h-5 w-5' />
                &nbsp; Please wait...
              </div>
            ) : (
              'Add post'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
