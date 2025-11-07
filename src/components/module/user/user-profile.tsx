'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputPassword } from '@/components/ui/input-password';
import { Spinner } from '@/components/ui/spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const userFromSchema = z
  .object({
    fullname: z.string().nonempty('Fullname is not empty'),
    user_name: z.string().nonempty('Username is not empty'),
    birthday: z
      .string()
      .nonempty('Date of birth is not empty')
      .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/, 'Invalid date format'),
    phone_number: z.string().nonempty('Phone number is not empty'),
    email: z.email('Please enter valid email address').nonempty('Email is not empty'),
    password: z.string().nonempty('Password is not empty').min(8, 'Password must be at least 8 characters'),
    confirm_password: z
      .string()
      .nonempty('Confirm password is not empty')
      .min(8, 'Password must be at least 8 characters')
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password']
  });

type PostFormProps = {
  onSubmit: (data: z.infer<typeof userFromSchema>) => void;
  defaultValues?: z.infer<typeof userFromSchema>;
  isSubmitting?: boolean;
  submitLabel?: string;
};

export default function UserProfile({
  onSubmit,
  defaultValues,
  isSubmitting,
  submitLabel = 'Save post'
}: PostFormProps) {
  const form = useForm<z.infer<typeof userFromSchema>>({
    resolver: zodResolver(userFromSchema),
    mode: 'onChange',
    defaultValues: {
      fullname: '',
      user_name: '',
      birthday: '',
      phone_number: '',
      email: '',
      password: '',
      confirm_password: '',
      ...defaultValues
    }
  });

  const handleSubmit = async (data: z.infer<typeof userFromSchema>) => {
    await onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className='form-layout space-y-10'>
          <FormField
            control={form.control}
            name='fullname'
            render={({ field }) => (
              <FormItem className='flex flex-col items-start gap-y-5'>
                <FormLabel required htmlFor='fullname'>
                  Fullname
                </FormLabel>
                <FormControl>
                  <Input id='fullname' placeholder='Enter your fullname' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='user_name'
            render={({ field }) => (
              <FormItem className='flex flex-col items-start gap-y-5'>
                <FormLabel required htmlFor='user_name'>
                  Username
                </FormLabel>
                <FormControl>
                  <Input id='user_name' placeholder='Enter your username' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='birthday'
            render={({ field }) => (
              <FormItem className='flex flex-col items-start gap-y-5'>
                <FormLabel required htmlFor='birthday'>
                  Day of Birth
                </FormLabel>
                <FormControl>
                  <Input id='birthday' placeholder='Enter your birthday' {...field} />
                </FormControl>
                <FormDescription className='text-xs italic'>Format: dd/mm/yyyy</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone_number'
            render={({ field }) => (
              <FormItem className='flex flex-col items-start gap-y-5'>
                <FormLabel required htmlFor='phone_number'>
                  Phone number
                </FormLabel>
                <FormControl>
                  <Input id='phone_number' placeholder='Enter your phone number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='flex flex-col items-start gap-y-5'>
                <FormLabel required htmlFor='email'>
                  Email
                </FormLabel>
                <FormControl>
                  <Input id='email' placeholder='Enter your email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div></div>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='flex flex-col items-start gap-y-5'>
                <FormLabel required htmlFor='password'>
                  Password
                </FormLabel>
                <FormControl>
                  <InputPassword id='password' placeholder='Enter your password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirm_password'
            render={({ field }) => (
              <FormItem className='flex flex-col items-start gap-y-5'>
                <FormLabel required htmlFor='confirm_password'>
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <InputPassword id='confirm_password' placeholder='Enter your confirm password' {...field} />
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
