import { getServerSession } from 'next-auth';
import { unauthorized } from 'next/navigation';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/optioins';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (!session) unauthorized();

  return <>{children}</>;
};

export default ProtectedLayout;
