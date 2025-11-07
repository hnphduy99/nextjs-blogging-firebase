import AdminHeading from '@/components/module/admin/admin-heading';
import UserNew from '@/components/module/user/user-new';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Add New User - Next Blog'
};

export default function UserAddNewPage() {
  return (
    <>
      <AdminHeading title='Add user' desc='Add new user' />
      <UserNew />
    </>
  );
}
