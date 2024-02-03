'use client';

import { PostgrestError, Session } from '@supabase/supabase-js';
import Link from 'next/link';

import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { DoorClosed, DoorOpen, Home, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, buttonVariants } from './ui/button';

const LINKS: { url: string; label: string }[] = [
  { url: '/article/list', label: 'Article List' },
];

const Header = () => {
  return (
    <nav className='grid h-12 shadow'>
      <div className='container flex w-full items-center justify-between'>
        <div className='flex gap-x-4 items-center'>
          <HomeIcon />
          {LINKS.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className={buttonVariants({ variant: 'ghost' })}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <AuthPane />
      </div>
    </nav>
  );
};

export default Header;

const HomeIcon = () => {
  return (
    <Link
      href={'/'}
      className={buttonVariants({ variant: 'ghost', size: 'icon' })}
    >
      <Home />
    </Link>
  );
};

const AuthPane = () => {
  const router = useRouter();
  const supabase = createSupabaseClientComponentClient();
  const [session, setSession] = useState<null | Session>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!session) return;
    const fetchData = async () => {
      let isAdmin = false;
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        const { user } = data;
        if (user?.email) {
          isAdmin = user.email === process.env.NEXT_PUBLIC_SUPABASE_ADMIN_EMAIL;
        }
      } catch (error) {
        const { message } = error as PostgrestError;
        console.error(message);
      } finally {
        setIsAdmin(isAdmin);
      }
    };
    fetchData();
  }, [supabase, session]);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
    return () => data.subscription.unsubscribe();
  }, [supabase]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    router.refresh();
  };
  return (
    <div className='flex items-center gap-x-2'>
      {isAdmin ? (
        <div className={buttonVariants({ variant: 'ghost', size: 'icon' })}>
          <ShieldCheck />
        </div>
      ) : null}
      {session ? (
        <Button variant={'ghost'} size={'icon'} onClick={signOut}>
          <DoorOpen />
        </Button>
      ) : (
        <Link
          href={'/login'}
          className={buttonVariants({ variant: 'ghost', size: 'icon' })}
        >
          <DoorClosed />
        </Link>
      )}
    </div>
  );
};
