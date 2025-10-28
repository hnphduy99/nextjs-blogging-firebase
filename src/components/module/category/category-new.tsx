'use client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AdminHeading from '../admin/admin-heading';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { categoryStatus } from '@/constants/post';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { slugify } from '@/lib/utils';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/firebase-config';
import { useToast } from '@/hooks/useToast';
import { useAuth } from '@/providers/auth-provider';

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

  return (
    <div>
      <AdminHeading title='Add category' desc='Add new category' />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(addCategoryHandler)}>
          <div className='form-layout space-y-10'>
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem className='flex flex-col items-start gap-y-5'>
                  <FormLabel required htmlFor='category'>
                    Category
                  </FormLabel>
                  <FormControl>
                    <Input id='category' placeholder='Enter your category' {...field} />
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
                      {categoryStatus.map((status) => (
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
              'Add category'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
