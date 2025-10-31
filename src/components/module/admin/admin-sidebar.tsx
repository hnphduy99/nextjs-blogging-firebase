'use client';
import { auth } from '@/firebase/firebase-config';
import { signOut } from 'firebase/auth';
import { Archive, BookOpen, Box, LogOut, UsersRound } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const sidebarLinks = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: <Box />
  },
  {
    title: 'Post',
    url: '/admin/post',
    icon: <BookOpen />
  },
  {
    title: 'Category',
    url: '/admin/category',
    icon: <Archive />
  },
  {
    title: 'User',
    url: '/admin/user',
    icon: <UsersRound />
  },
  {
    title: 'Logout',
    url: '/',
    icon: <LogOut />,
    onClick: () => signOut(auth)
  }
];

export default function AdminSidebar() {
  return (
    <div className='w-[300px] rounded-xl bg-white shadow-[10px_10px_20px_rgba(218,213,213,0.15)] max-lg:hidden'>
      {sidebarLinks.map((link) => {
        const menuItemStyle =
          'active:text-primary hover:text-primary mb-5 flex cursor-pointer items-center gap-5 px-5 py-3.5 font-medium text-[#808191] hover:bg-[#f1fbf7] active:bg-[#f1fbf7]';
        if (link.onClick)
          return (
            <div className={`menu-item ${menuItemStyle}`} onClick={link.onClick} key={link.title}>
              <span className='menu-icon'>{link.icon}</span>
              <span className='menu-text'>{link.title}</span>
            </div>
          );
        return (
          <Link href={link.url} className={`menu-item ${menuItemStyle}`} key={link.title}>
            <span className='menu-icon'>{link.icon}</span>
            <span className='menu-text'>{link.title}</span>
          </Link>
        );
      })}
    </div>
  );
}
