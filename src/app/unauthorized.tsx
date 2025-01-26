import LoginButton from '@/components/login-button';
import React from 'react';

const Unauthorized: React.FC = ({}) => {
  return (
    <main className="flex flex-col items-center justify-center min-h-dvh space-y-4">
      <h1 className="text-3xl font-bold">401 - Unauthorized</h1>
      <p>Please log in to access this page.</p>
      <LoginButton />
    </main>
  );
};

export default Unauthorized;
