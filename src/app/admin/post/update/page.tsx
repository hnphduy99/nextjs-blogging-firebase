import AdminHeading from '@/components/module/admin/admin-heading';
import PostUpdate from '@/components/module/post/post-update';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Update Post - Next Blog'
};

export default async function PostUpdatePage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const postId = (await searchParams).id as string;
  return (
    <>
      <AdminHeading title='Update Post' desc={`Update post with id: ${postId}`} />
      <PostUpdate postId={postId} />
    </>
  );
}
