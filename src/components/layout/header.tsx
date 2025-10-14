import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useAuth } from '@/providers/auth-provider';
import { User } from 'firebase/auth';

const menuLinks = [
  {
    title: 'Home',
    url: '/'
  },
  {
    title: 'Blog',
    url: '/contact'
  },
  {
    title: 'Contact',
    url: '/contact'
  }
];

function getLastName(name: string | null) {
  if (!name) return 'user';
  const length = name.split(' ').length;
  return name.split(' ')[length - 1];
}

export default function Header() {
  const { user } = useAuth();
  return (
    <header className='px-0 py-10'>
      <div className='container'>
        <div className='flex items-center'>
          <a href='/'>
            <img srcSet='/nextjs.svg 2x' alt='nextjs blogging' className='block max-w-[50px]' />
          </a>
          <ul className='ml-10 flex items-center gap-5'>
            {menuLinks.map((link) => (
              <li key={link.title}>
                <a href={link.url}>{link.title}</a>
              </li>
            ))}
          </ul>
          <div className='search relative mr-5 ml-auto flex w-full max-w-[320px] items-center rounded-md border px-6.5 py-3.5'>
            <input type='text' className='search-input flex-1 pr-11 outline-none' placeholder='Search post...' />
            <span className='search-icon absolute top-1/2 right-6 -translate-y-1/2'>
              <Search />
            </span>
          </div>
          {!user ? (
            <Link href='/sign-up'>
              <Button className='header-button h-15 py-4'>Sign up</Button>
            </Link>
          ) : (
            <div className='header-auth'>
              <span>Welcome back, </span>
              <strong>{getLastName(user.displayName)}</strong>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
