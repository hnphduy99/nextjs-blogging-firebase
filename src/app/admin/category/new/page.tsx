import CategoryNew from '@/components/module/category/category-new';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Add New Category - Next Blog'
};

export default function CategoryAddNewPage() {
  return <CategoryNew />;
}
