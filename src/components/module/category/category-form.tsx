'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Spinner } from '@/components/ui/spinner';
import { categoryStatus } from '@/constants/post';
import { UseFormReturn, FieldValues, Path } from 'react-hook-form';

interface CategoryFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  submit: (values: T) => void | Promise<void>;
  nameSubmitButton: string;
}

export default function CategoryForm<T extends FieldValues>({ form, submit, nameSubmitButton }: CategoryFormProps<T>) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <div className='form-layout space-y-10'>
          <FormField
            control={form.control}
            name={'category' as Path<T>}
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
            name={'slug' as Path<T>}
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
            name={'status' as Path<T>}
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

        <Button disabled={form.formState.isSubmitting} type='submit' className='mx-auto block h-15 min-w-80 p-5'>
          {form.formState.isSubmitting ? (
            <div className='flex justify-center align-middle'>
              <Spinner className='h-5 w-5' />
              &nbsp; Please wait...
            </div>
          ) : (
            nameSubmitButton
          )}
        </Button>
      </form>
    </Form>
  );
}
