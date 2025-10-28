'use client';
import ActionDelete from '@/components/actions/ActionDelete';
import ActionEdit from '@/components/actions/ActionEdit';
import ActionView from '@/components/actions/ActionView';
import Table from '@/components/table/Table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { categoryStatus } from '@/constants/post';
import { db } from '@/firebase/firebase-config';
import { collection, deleteDoc, doc, limit, onSnapshot, query, Timestamp } from 'firebase/firestore';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  useEffect(() => {
    getCategories();
  }, []);

  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);

  const handleDeleteCategory = async (id: string) => {
    const colRef = doc(db, 'categories', id);
    await deleteDoc(colRef);
  };

  return (
    <div>
      <AdminHeading title='Categories' desc='Manage your category' />

      <div className='mb-10 flex justify-between'>
        <Button variant='outline' className='h-15' onClick={() => router.push('/admin/category/new')}>
          Create category
        </Button>
        <Input
          type='text'
          placeholder='Search category...'
          className='w-80 rounded-lg border border-gray-300 px-5 py-4 outline-none'
          onChange={handleInputFilter}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.category}</td>
                <td>
                  <span className='text-gray-400 italic'>{category.slug}</span>
                </td>
                <td>{categoryStatus.find((item) => item.value === category.status)?.label}</td>
                <td>
                  <div className='flex items-center gap-x-3 text-gray-500'>
                    <ActionView onClick={() => router.push(`/admin/category/${category.slug}`)} />
                    <ActionEdit onClick={() => router.push(`/manage/update-category?id=${category.id}`)} />
                    <ActionDelete onClick={() => handleDeleteCategory(category.id)} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
