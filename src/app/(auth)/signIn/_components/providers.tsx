'use client';

import { Button } from '@/components/ui/button';
import { BuiltInProviderType } from 'next-auth/providers/index';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';

type Props = {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null; // This is the type of the providers prop
};

export default function Providers({ providers }: Props) {
  if (!providers) {
    return null;
  }
  const data = Object.entries(providers).filter(([key]) => key !== 'credentials');

  return (
    <div>
      {data.map(([key, provider]) => (
        <div key={key}>
          <Button
            className="w-full"
            variant={'outline'}
            onClick={() => signIn(key, { callbackUrl: '/' })}
          >
            {provider.name}
          </Button>
        </div>
      ))}
    </div>
  );
}
