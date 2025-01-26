import { authOptions } from '@/app/api/auth/[...nextauth]/optioins';
import { getServerSession } from 'next-auth';
import React from 'react';

const UserPage: React.FC = async ({}) => {
  const data = await getServerSession(authOptions);
  return (
    <div>
      <h1>{data?.user?.name}</h1>
    </div>
  );
};

export default UserPage;
