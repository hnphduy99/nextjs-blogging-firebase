import React from 'react';

export default function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className='overflow-x-auto rounded-[10px] bg-white'>
      <table className='w-full [&_td]:px-[30px] [&_td]:py-[15px] [&_td]:align-middle [&_td]:whitespace-nowrap [&_th]:px-[30px] [&_th]:py-[20px] [&_th]:text-left [&_th]:align-middle [&_th]:font-semibold [&_thead]:bg-[#f7f7f8]'>
        {children}
      </table>
    </div>
  );
}
