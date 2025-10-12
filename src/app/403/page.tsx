export default function ForbiddenPage() {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h1 className='text-3xl font-bold text-red-500'>403 - Forbidden</h1>
      <p>You do not have permission to access this page.</p>
    </div>
  );
}
