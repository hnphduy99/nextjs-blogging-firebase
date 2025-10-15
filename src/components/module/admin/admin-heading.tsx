interface AdminHeadingProps {
  title: string;
  desc: string;
  children?: React.ReactNode;
}

export default function AdminHeading({ title, desc, children }: AdminHeadingProps) {
  return (
    <div className='mb-10 flex items-start justify-between'>
      <div>
        <h1 className='admin-heading mb-[5px] text-[25px] font-bold text-black max-lg:text-[20px]'>{title}</h1>
        <p className='admin-short-desc text-sm text-[#808191]'>{desc}</p>
      </div>
      {children}
    </div>
  );
}
