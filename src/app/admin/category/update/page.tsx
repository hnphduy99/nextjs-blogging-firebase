import AdminHeading from '@/components/module/admin/admin-heading';
import CategoryUpdate from '@/components/module/category/category-update';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Update Category - Next Blog'
};

export default async function CategoryUpdatePage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const categoryId = (await searchParams).id as string;
  return (
    <>
      <AdminHeading title='Update category' desc={`Update category with id: ${categoryId}`} />
      <CategoryUpdate categoryId={categoryId} />
    </>
  );
}
