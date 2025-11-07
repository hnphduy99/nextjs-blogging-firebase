'use client';
import ImageUpload from '@/components/image/ImageUpload';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputPassword } from '@/components/ui/input-password';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Spinner } from '@/components/ui/spinner';
import { userRole, userStatus } from '@/constants/constants';
import { optionalRegex } from '@/lib/helper';
import { extractPublicId } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

const userFormSchema = z.object({
  fullname: z.string().nonempty('Fullname is not empty'),
  user_name: z.string().nonempty('Username is not empty'),
  birthday: optionalRegex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/, 'Invalid date format'),
  phone_number: optionalRegex(/^(?:\+84|0084|0)[235789][0-9]{8}$/, 'Invalid phone number'),
  email: z.email('Please enter valid email address').nonempty('Email is not empty'),
  status: z.number(),
  role: z.number(),
  created_at: z.any().optional(),
  avatar: z.string().optional()
});

export const userSchemaAdd = userFormSchema
  .extend({
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

export const userSchemaUpdate = userFormSchema.extend({
  password: z.string().optional(),
  confirm_password: z.string().optional()
});

type UserFormProps =
  | {
      onSubmit: (data: z.infer<typeof userSchemaAdd>) => void | Promise<void>;
      defaultValues?: z.infer<typeof userSchemaAdd>;
      isSubmitting?: boolean;
      submitLabel?: string;
      isSuccess?: boolean;
      type: 'add';
    }
  | {
      onSubmit: (data: z.infer<typeof userSchemaUpdate>) => void | Promise<void>;
      defaultValues?: z.infer<typeof userSchemaUpdate>;
      isSubmitting?: boolean;
      submitLabel?: string;
      isSuccess?: boolean;
      type: 'update';
    };

export default function UserForm({
  onSubmit,
  defaultValues,
  isSubmitting,
  submitLabel = 'Save post',
  isSuccess,
  type
}: UserFormProps) {
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const schema = type === 'add' ? userSchemaAdd : userSchemaUpdate;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      fullname: '',
      user_name: '',
      birthday: '',
      phone_number: '',
      email: '',
      password: '',
      confirm_password: '',
      status: userStatus.ACTIVE,
      role: userRole.USER,
      avatar: '',
      ...defaultValues
    }
  });
  const image = useWatch({ control: form.control, name: 'avatar' });

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    await onSubmit(data as any);
  };

  useEffect(() => {
    if (isSuccess) form.reset();
  }, [form, isSuccess]);

  const handleSelectImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoadingImage(true);
      const file = e.target.files?.[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/api/upload', formData);
      form.setValue('avatar', res.data.url);
    } finally {
      setIsLoadingImage(false);
    }
  };

  const handleDeleteImage = async () => {
    try {
      setIsLoadingImage(true);
      const publicId = image && extractPublicId(image);
      if (!publicId) return;
      await axios.delete(`/api/upload`, { data: { public_id: publicId } });
      form.setValue('avatar', '');
    } finally {
      setIsLoadingImage(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormItem className='mb-10 flex flex-col items-start gap-y-5'>
          <FormLabel htmlFor='Image'>Image</FormLabel>
          <div className='mx-auto mb-10 h-[200px] w-[200px] rounded-full'>
            <ImageUpload
              disabled={isLoadingImage}
              loading={isLoadingImage}
              name='image'
              handleDeleteImage={handleDeleteImage}
              image={image}
              onChange={handleSelectImage}
              className='h-full !rounded-full'
            />
          </div>
        </FormItem>
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
                <FormLabel htmlFor='birthday'>Day of Birth</FormLabel>
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
                <FormLabel htmlFor='phone_number'>Phone number</FormLabel>
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
          {type === 'add' && (
            <>
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
            </>
          )}
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
                    className='flex h-[20px] w-full'
                  >
                    {Object.entries(userStatus).map(([key, value]) => (
                      <div key={key} className='flex items-center space-x-2'>
                        <RadioGroupItem value={String(value)} id={key} />
                        <FormLabel
                          htmlFor={key}
                          className='text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                        >
                          {key}
                        </FormLabel>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem className='flex flex-col items-start gap-y-5'>
                <FormLabel htmlFor='role'>Role</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(val) => field.onChange(Number(val))}
                    defaultValue={String(field.value)}
                    className='flex h-[20px] w-full'
                  >
                    {Object.entries(userRole).map(([key, value]) => (
                      <div key={key} className='flex items-center space-x-2'>
                        <RadioGroupItem value={String(value)} id={key} />
                        <FormLabel
                          htmlFor={key}
                          className='text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                        >
                          {key}
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
