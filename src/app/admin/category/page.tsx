import AdminHeading from '@/components/module/admin/admin-heading';
import CategoryManage from '@/components/module/category/category-manage';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Manage Category - Next Blog'
};

export default function CategoryPage() {
  return (
    <>
      <AdminHeading title='Categories' desc='Manage your category' />
      <CategoryManage />
    </>
  );
}
