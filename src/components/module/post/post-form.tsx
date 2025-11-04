'use client';
import ImageUpload from '@/components/image/ImageUpload';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import { postStatus } from '@/constants/post';
import { extractPublicId } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

export const postFormSchema = z.object({
  title: z.string().nonempty('Title is required'),
  slug: z.string().optional(),
  status: z.number().optional(),
  category_id: z.string().nonempty('Category is required'),
  image: z.string(),
  hot: z.boolean().optional(),
  created_at: z.any().optional()
});

type PostFormProps = {
  onSubmit: (data: z.infer<typeof postFormSchema>) => Promise<void> | void;
  defaultValues?: Partial<z.infer<typeof postFormSchema>>;
  categories: { value: string; label: string }[];
  isSubmitting?: boolean;
  submitLabel?: string;
};

export default function PostForm({
  onSubmit,
  defaultValues,
  categories,
  isSubmitting,
  submitLabel = 'Save post'
}: PostFormProps) {
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      slug: '',
      status: 2,
      category_id: '',
      image: '',
      hot: false,
      created_at: serverTimestamp(),
      ...defaultValues
    }
  });

  const image = useWatch({ control: form.control, name: 'image' });

  const handleSelectImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoadingImage(true);
      const file = e.target.files?.[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/api/upload', formData);
      form.setValue('image', res.data.url);
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
    } finally {
      setIsLoadingImage(false);
    }
  };

  const handleSubmit = async (data: z.infer<typeof postFormSchema>) => {
    await onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
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
              onChange={handleSelectImage}
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
        <Button disabled={isSubmitting} type='submit' className='mx-auto block h-15 min-w-80 p-5'>
          {isSubmitting ? (
            <div className='flex justify-center align-middle'>
              <Spinner className='h-5 w-5' />
              &nbsp; Please wait...
            </div>
          ) : (
            submitLabel
          )}
        </Button>
      </form>
    </Form>
  );
}
