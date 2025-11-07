'use client';
import UserForm, { userSchemaUpdate } from '@/components/module/user/user-form';
import { db } from '@/firebase/firebase-config';
import { useToast } from '@/hooks/useToast';
import { IUser } from '@/interfaces/user.inteface';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { z } from 'zod';

export default function UserUpdate({ userId }: { userId: string }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, 'users', userId!);
      const singleDoc = await getDoc(colRef);
      setUser(singleDoc.data() as IUser);
    }
    fetchData();
  }, [userId, isSuccess]);

  const updateUserHandler = async (data: z.infer<typeof userSchemaUpdate>) => {
    try {
      setLoading(true);
      const cloneData = {
        ...data,
        updated_at: serverTimestamp()
      };
      const colRef = doc(db, 'users', userId!);
      await updateDoc(colRef, cloneData);
      toast.success('User updated successfully.');
      setIsSuccess(true);
    } catch (error: any) {
      toast.error('Failed to create user.', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <UserForm
      onSubmit={updateUserHandler}
      isSuccess={isSuccess}
      isSubmitting={loading}
      type='update'
      submitLabel='Update user'
      defaultValues={user}
    />
  );
}
