import AdminHeading from '@/components/module/admin/admin-heading';
import UserUpdate from '@/components/module/user/user-update';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Update User - Next Blog'
};

export default async function UserUpdatePage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const userId = (await searchParams).id as string;
  return (
    <>
      <AdminHeading title='Update user' desc={`Update user with id: ${userId}`} />
      <UserUpdate userId={userId} />
    </>
  );
}
