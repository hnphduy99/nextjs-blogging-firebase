'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { db } from '@/firebase/firebase-config';
import { formatDateFirestore } from '@/lib/utils';
import { collection, limit, onSnapshot, query, Timestamp } from 'firebase/firestore';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import AdminHeading from '../admin/admin-heading';

interface ICategories {
  id: string;
  category: string;
  slug: string;
  created_at: Timestamp;
  user_id: string;
  status: number;
}

export default function CategoryManage() {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [filter, setFilter] = useState(undefined);

  const getCategories = async () => {
    const colRef = collection(db, 'categories');
    const q = query(colRef, limit(10));
    onSnapshot(q, (querySnapshot) => {
      const result: ICategories[] = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data()
        } as ICategories);
      });
      setCategories(result);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const headerTable = ['STT', 'Category', 'Slug', 'Status', 'Created At', 'Actions'];

  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);

  return (
    <div>
      <AdminHeading title='Categories' desc='Manage your category' />
      <Button>Create category</Button>
      <div className='mb-10 flex justify-end'>
        <Input
          type='text'
          placeholder='Search category...'
          className='w-80 rounded-lg border border-gray-300 px-5 py-4 outline-none'
          onChange={handleInputFilter}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {headerTable.map((item, index) => (
              <TableHead className='text-center' key={index}>
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={category.id}>
              <TableCell className='text-right'>{index + 1}</TableCell>
              <TableCell>{category.category}</TableCell>
              <TableCell>{category.slug}</TableCell>
              <TableCell>{category.status}</TableCell>
              <TableCell>{formatDateFirestore(category.created_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
