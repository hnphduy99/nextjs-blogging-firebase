import AdminHeading from '@/components/module/admin/admin-heading';
import PostManage from '@/components/module/post/post-manage';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Manage Post - Next Blog'
};

export default function PostPage() {
  return (
    <>
      <AdminHeading title='Posts' desc='Manage your post' />
      <PostManage />
    </>
  );
}
