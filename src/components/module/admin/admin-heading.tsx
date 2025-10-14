interface AdminHeadingProps {
  title: string;
  desc: string;
  children?: React.ReactNode;
}

export default function AdminHeading({ title, desc, children }: AdminHeadingProps) {
  return (
    <div className='mb-10 flex items-start justify-between'>
      <div>
        <h1 className='admin-heading'>{title}</h1>
        <p className='admin-short-desc'>{desc}</p>
      </div>
      {children}
    </div>
  );
}
