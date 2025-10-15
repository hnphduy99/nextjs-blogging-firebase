import { AdminHeader } from '@/components/module/admin/admin-header';
import AdminSidebar from '@/components/module/admin/admin-sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='mx-auto max-w-[1600px]'>
      <AdminHeader />
      <div className='dashboard-main grid grid-cols-[300px_minmax(0,1fr)] items-start gap-x-10 gap-y-0 px-5 py-10 max-lg:grid-cols-[100%] max-lg:p-5'>
        <AdminSidebar />
        <div className='dashboard-children'>{children}</div>
      </div>
    </div>
  );
}
