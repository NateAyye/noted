'use client';
import React from 'react';

interface UserPageProps {
  params: Promise<{ username: string }>;
}

const UserPage: React.FC<UserPageProps> = ({ params }) => {
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    params.then((data) => {
      setData(data.username);
    });
  }, [params]);

  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
};

export default UserPage;
