'use client';
import { Button } from '@/components/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import { Skeleton } from './ui/skeleton';

const LoginButton: React.FC = ({}) => {
  const { data, status } = useSession();

  if (status === 'loading') {
    return (
      <Button variant={'outline'} className="font-bold">
        <Skeleton className="w-[47px] h-[20px] rounded-md" />
      </Button>
    );
  }

  return (
    <div>
      {data ? (
        <Button variant={'outline'} className="font-bold" onClick={() => signOut()}>
          Logout
        </Button>
      ) : (
        <Button variant={'outline'} className="font-bold" onClick={() => signIn()}>
          Login
        </Button>
      )}
    </div>
  );
};

export default LoginButton;
