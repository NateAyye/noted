'use client';
import { NotebookIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import LoginButton from './login-button';
import { Button } from './ui/button';

export default function HomeHeader({}) {
  const { data, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <header className="border-b ">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto  px-4 py-2">
        <Link href="/">Noted</Link>
        <div>
          <Link href="/about">About</Link>
        </div>
        <div className="flex items-center gap-3">
          {data ? (
            <Button variant={'outline'} asChild>
              <Link href={`/book`}>
                <NotebookIcon />
              </Link>
            </Button>
          ) : null}
          <LoginButton />
        </div>
      </div>
    </header>
  );
}
