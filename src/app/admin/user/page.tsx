import AdminHeading from '@/components/module/admin/admin-heading';
import UserManage from '@/components/module/user/user-manage';
import React from 'react';

export default function UserPage() {
  return (
    <>
      <AdminHeading title='Users' desc='Manage user list' />
      <UserManage />
    </>
  );
}
