import { AdminHeader } from '@/components/module/admin/admin-header';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AdminHeader />
      {children}
    </div>
  );
}
