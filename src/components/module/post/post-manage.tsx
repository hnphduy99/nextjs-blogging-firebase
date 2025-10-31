'use client';
import ActionEdit from '@/components/actions/ActionEdit';
import ActionView from '@/components/actions/ActionView';
import Table from '@/components/table/Table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import Popconfirm from '@/components/ui/popconfirm';
import { postStatus } from '@/constants/post';
import { db } from '@/firebase/firebase-config';
import { IPosts } from '@/interfaces/posts.interface';
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where
} from 'firebase/firestore';
import { debounce } from 'lodash';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const PAGE_SIZE = 10;

export default function PostManage() {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [firstDoc, setFirstDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const router = useRouter();

  const handleInputFilter = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setPage(1);
  }, 500);

  const handleDeletePost = async (id: string) => {
    const colRef = doc(db, 'posts', id);
    await deleteDoc(colRef);
    getPosts();
  };

  const handleNextPage = async () => {
    if (isLastPage) return;
    await getPosts('next');
    setPage((p) => p + 1);
  };

  const handlePrevPage = async () => {
    if (page === 1) return;
    await getPosts('prev');
    setPage((p) => p - 1);
  };

  const getPosts = async (direction: 'next' | 'prev' | 'init' = 'init') => {
    const colRef = collection(db, 'posts');
    let baseQuery = filter
      ? query(
          colRef,
          where('title', '>=', filter),
          where('title', '<=', filter + '\uf8ff'),
          orderBy('title'),
          limit(PAGE_SIZE)
        )
      : query(colRef, orderBy('title'), limit(PAGE_SIZE));

    if (direction === 'next' && lastDoc) {
      baseQuery = query(baseQuery, startAfter(lastDoc));
    }
    if (direction === 'prev' && firstDoc) {
      baseQuery = query(baseQuery, endBefore(firstDoc), limitToLast(PAGE_SIZE));
    }

    const snapshot = await getDocs(baseQuery);
    const docs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as IPosts[];

    setPosts(docs);
    setFirstDoc(snapshot.docs[0] || null);
    setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
    setIsLastPage(snapshot.docs.length < PAGE_SIZE);
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <div>
      <div className='mb-10 flex justify-between'>
        <Button variant='outline' onClick={() => router.push('/admin/post/new')}>
          Create post
        </Button>
        <Input
          type='text'
          placeholder='Search post...'
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
            <th className='fixed'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>
                  <span className='text-gray-400 italic'>{post.slug}</span>
                </td>
                <td>{postStatus.find((item) => item.value === post.status)?.label}</td>
                <td>
                  <div className='flex items-center gap-x-3 text-gray-500'>
                    <Popconfirm
                      title={`Delete post "${post.title}"?`}
                      description='This action cannot be undone. Are you sure?'
                      okText='Delete'
                      cancelText='Cancel'
                      okButtonVariant='destructive'
                      onConfirm={() => handleDeletePost(post.id)}
                    >
                      <Button variant='outline' size='icon'>
                        <Trash2 />
                      </Button>
                    </Popconfirm>
                    <ActionView onClick={() => router.push(`/admin/post/${post.slug}`)} />
                    <ActionEdit onClick={() => router.push(`/admin/post/update?id=${post.id}`)} />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className='py-10 text-center text-gray-400'>
                No post found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination controls */}
      <div className='mt-6 flex justify-center'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevPage}
                className={page === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            <PaginationItem>
              <span className='px-3 text-sm text-gray-500'>{page}</span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={handleNextPage} className={isLastPage ? 'pointer-events-none opacity-50' : ''} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
