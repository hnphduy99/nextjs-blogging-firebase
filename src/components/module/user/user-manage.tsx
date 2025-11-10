'use client';
import ActionEdit from '@/components/actions/ActionEdit';
import ActionView from '@/components/actions/ActionView';
import LabelStatus from '@/components/labelStatus/LabelStatus';
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
import { userRole, userStatus } from '@/constants/constants';
import { db } from '@/firebase/firebase-config';
import { IUser } from '@/interfaces/user.inteface';
import { extractPublicId, formatDateFirestore } from '@/lib/utils';
import axios from 'axios';
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
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const PAGE_SIZE = 10;

export default function UserManage() {
  const [users, setUsers] = useState<IUser[]>([]);
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

  const handleDeleteUser = async (user: IUser) => {
    const colRef = doc(db, 'users', user.id);
    await deleteDoc(colRef);
    const publicId = extractPublicId(user.avatar);
    await axios.delete(`/api/upload`, { data: { public_id: publicId } });
    getUsers();
  };

  const handleNextPage = async () => {
    if (isLastPage) return;
    await getUsers('next');
    setPage((p) => p + 1);
  };

  const handlePrevPage = async () => {
    if (page === 1) return;
    await getUsers('prev');
    setPage((p) => p - 1);
  };

  const getUsers = async (direction: 'next' | 'prev' | 'init' = 'init') => {
    const colRef = collection(db, 'users');
    let baseQuery = filter
      ? query(
          colRef,
          where('fullname', '>=', filter),
          where('fullname', '<=', filter + '\uf8ff'),
          orderBy('fullname'),
          limit(PAGE_SIZE)
        )
      : query(colRef, orderBy('fullname'), limit(PAGE_SIZE));

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
    })) as IUser[];

    setUsers(docs);
    setFirstDoc(snapshot.docs[0] || null);
    setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
    setIsLastPage(snapshot.docs.length < PAGE_SIZE);
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const renderLabelStatus = (status: number) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type='success'>Active</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type='warning'>Pending</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type='danger'>Rejected</LabelStatus>;

      default:
        break;
    }
  };

  const renderRoleLabel = (role: number) => {
    switch (role) {
      case userRole.ADMIN:
        return 'Admin';
      case userRole.MOD:
        return 'Moderator';
      case userRole.USER:
        return 'User';

      default:
        break;
    }
  };

  return (
    <div>
      <div className='mb-10 flex justify-between'>
        <Button variant='outline' onClick={() => router.push('/admin/user/new')}>
          Create user
        </Button>
        <Input
          type='text'
          placeholder='Search name...'
          className='w-80 rounded-lg border border-gray-300 px-5 py-4 outline-none'
          onChange={handleInputFilter}
        />
      </div>

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Username</th>
            <th>Email address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td title={user.id}>{user.id.slice(0, 5) + '...'}</td>
                <td className='whitespace-nowrap'>
                  <div className='flex items-center gap-x-3'>
                    <div className='relative h-10 w-10'>
                      <Image
                        src={user?.avatar || '/file.svg'}
                        alt={user?.fullname || 'Avatar'}
                        fill
                        className='rounded-md object-cover'
                        sizes='40px'
                      />
                    </div>
                    <div className='flex-1'>
                      <h3>{user?.fullname}</h3>
                      <time className='text-sm text-gray-300'>{formatDateFirestore(user?.created_at)}</time>
                    </div>
                  </div>
                </td>
                <td>{user?.user_name}</td>
                <td>{user?.email.slice(0, 5) + '...'}</td>
                <td>{renderLabelStatus(user.status)}</td>
                <td>{renderRoleLabel(user.role)}</td>
                <td>
                  <div className='flex items-center gap-x-3 text-gray-500'>
                    <Popconfirm
                      title={`Delete user "${user.email}"?`}
                      description='This action cannot be undone. Are you sure?'
                      okText='Delete'
                      cancelText='Cancel'
                      okButtonVariant='destructive'
                      onConfirm={() => handleDeleteUser(user)}
                    >
                      <Button variant='outline' size='icon'>
                        <Trash2 />
                      </Button>
                    </Popconfirm>
                    <ActionView onClick={() => router.push(`/admin/user/${user.id}`)} />
                    <ActionEdit onClick={() => router.push(`/admin/user/update?id=${user.id}`)} />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className='py-10 text-center text-gray-400'>
                No user found
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
