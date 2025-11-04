'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Spinner } from '@/components/ui/spinner';
import { categoryStatus } from '@/constants/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { serverTimestamp } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const categoryFormSchema = z.object({
  name: z.string().nonempty('Name is required'),
  slug: z.string().optional(),
  status: z.number().optional(),
  created_at: z.any().optional()
});

type CategoryFormProps = {
  onSubmit: (data: z.infer<typeof categoryFormSchema>) => Promise<void> | void;
  defaultValues?: Partial<z.infer<typeof categoryFormSchema>>;
  isSubmitting?: boolean;
  submitLabel?: string;
};

export default function CategoryForm({
  onSubmit,
  defaultValues,
  isSubmitting,
  submitLabel = 'Save category'
}: CategoryFormProps) {
  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      slug: '',
      status: 1,
      created_at: serverTimestamp(),
      ...defaultValues
    }
  });

  const handleSubmit = async (data: z.infer<typeof categoryFormSchema>) => {
    await onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className='form-layout space-y-10'>
          <FormField
            control={form.control}
            name={'name'}
            render={({ field }) => (
              <FormItem className='flex flex-col items-start gap-y-5'>
                <FormLabel required htmlFor='name'>
                  Name
                </FormLabel>
                <FormControl>
                  <Input id='name' placeholder='Enter your name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'slug'}
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
            name={'status'}
            render={({ field }) => (
              <FormItem className='flex flex-col items-start gap-y-5'>
                <FormLabel htmlFor='status'>Status</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(val) => field.onChange(Number(val))}
                    value={field.value ? String(field.value) : undefined}
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
