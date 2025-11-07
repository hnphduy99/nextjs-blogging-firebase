'use client';
import UserForm, { userSchemaAdd } from '@/components/module/user/user-form';
import { auth, db } from '@/firebase/firebase-config';
import { useToast } from '@/hooks/useToast';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { z } from 'zod';

export default function UserNew() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const addUserHandler = async (data: z.infer<typeof userSchemaAdd>) => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirm_password, ...cloneData } = {
        ...data,
        created_at: serverTimestamp()
      };
      const colRef = collection(db, 'users');
      await addDoc(colRef, cloneData);
      toast.success('User created successfully.');
      setIsSuccess(true);
    } catch (error: any) {
      toast.error('Failed to create user.', error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <UserForm
      onSubmit={addUserHandler}
      isSuccess={isSuccess}
      isSubmitting={loading}
      type='add'
      submitLabel='Add user'
    />
  );
}
