'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { auth, db } from '@/firebase/firebase-config';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { InputPassword } from '../ui/input-password';
import { Spinner } from '../ui/spinner';

const formSchema = z.object({
  fullname: z.string().nonempty('Please enter your fullname'),
  email: z.email('Please enter valid email address').nonempty('Please enter your email address'),
  password: z.string().nonempty('Please enter your password').min(8, 'Password must be at least 8 characters')
});

export function SignUpForm({ className, ...props }: React.ComponentProps<'div'>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      fullname: '',
      email: '',
      password: ''
    }
  });
  const { success, error } = useToast();
  const isSubmitting = form.formState.isSubmitting;
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, values.email, values.password);
      if (user) {
        await updateProfile(user.user, { displayName: values.fullname });
        await setDoc(doc(db, 'users', user.user.uid), {
          uid: user.user.uid,
          fullname: values.fullname,
          email: values.email,
          password: values.password
        });
        success('Account created successfully.');
        router.push('/sign-in');
      }
    } catch (err: any) {
      error('Error', err.message);
    }
  };

  return (
    <div className={cn('container', className)} {...props}>
      <Image src='/nextjs.svg' width={90} height={90} alt='Next Logo' className='mx-auto mb-5' />
      <h1 className='text-primary mb-15 text-center text-[40px] font-bold'>Next Blogging</h1>
      <Form {...form}>
        <form className='mx-auto max-w-[800px] space-y-10' onSubmit={form.handleSubmit(onSubmit)} autoComplete='off'>
          <FormField
            control={form.control}
            name='fullname'
            render={({ field }) => (
              <FormItem className='flex flex-col items-start gap-y-5'>
                <FormLabel htmlFor='fullname'>Fullname</FormLabel>
                <FormControl>
                  <Input id='fullname' placeholder='Enter your fullname' {...field} />
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
                <FormLabel htmlFor='email'>Email</FormLabel>
                <FormControl>
                  <Input id='email' placeholder='Enter your email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='flex flex-col items-start gap-y-5'>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <FormControl>
                  <InputPassword id='password' placeholder='Enter your password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='text-center'>
            You have an account?{' '}
            <Link href='/sign-in' className='text-primary underline'>
              Sign in
            </Link>
          </div>
          <Button disabled={isSubmitting} type='submit' className='mx-auto block h-15 min-w-80 p-5'>
            {isSubmitting ? (
              <div className='flex justify-center align-middle'>
                <Spinner />
                &nbsp; Please wait...
              </div>
            ) : (
              'Sign Up'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
