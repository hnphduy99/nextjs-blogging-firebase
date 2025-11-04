import AdminHeading from '@/components/module/admin/admin-heading';
import PostNew from '@/components/module/post/post-new';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Add New Post - Next Blog'
};

export default function PostAddNewPage() {
  return (
    <>
      <AdminHeading title='Add post' desc='Add new post' />
      <PostNew />
    </>
  );
}
