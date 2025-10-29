import AdminHeading from '@/components/module/admin/admin-heading';
import CategoryNew from '@/components/module/category/category-new';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Add New Category - Next Blog'
};

export default function CategoryAddNewPage() {
  return (
    <>
      <AdminHeading title='Add category' desc='Add new category' />
      <CategoryNew />;
    </>
  );
}
