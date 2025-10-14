'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { InputPassword } from '../ui/input-password';
import { Spinner } from '../ui/spinner';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebase-config';
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/providers/auth-provider';
import Link from 'next/link';
import Image from 'next/image';

const formSchema = z.object({
  email: z.email('Please enter valid email address').nonempty('Please enter your email address'),
  password: z.string().nonempty('Please enter your password')
});

export function SignInForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { user } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const { success, error } = useToast();
  const isSubmitting = form.formState.isSubmitting;
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const user = await signInWithEmailAndPassword(auth, data.email, data.password);
      if (user) {
        success('Signed in successfully.');
        router.push('/');
      }
    } catch (err: any) {
      error('Error', err.message);
    }
  };
  useEffect(() => {
    if (user) router.push('/');
  }, [router, user]);

  return (
    <div className={cn('container', className)} {...props}>
      <Image src='/nextjs.svg' width={90} height={90} alt='Next Logo' className='mx-auto mb-5' />
      <h1 className='text-primary mb-15 text-center text-[40px] font-bold'>Next Blogging</h1>
      <Form {...form}>
        <form className='mx-auto max-w-[800px] space-y-10' onSubmit={form.handleSubmit(onSubmit)} autoComplete='off'>
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
          <div className='text-primary text-center'>
            Don&apos;t have an account?{' '}
            <Link href='/sign-up' className='underline'>
              Sign up now
            </Link>
          </div>
          <Button disabled={isSubmitting} type='submit' className='mx-auto block h-15 min-w-80 p-5'>
            {isSubmitting ? (
              <div className='flex justify-center align-middle'>
                <Spinner />
                &nbsp; Please wait...
              </div>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
