import { authOptions } from '@/app/api/auth/[...nextauth]/optioins';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';
import Providers from './_components/providers';
import SignInForm from './_components/signIn-form';
import SignUpForm from './_components/signUp-form';



const SignInPage: React.FC = async ({}) => {
  const session = await getServerSession(authOptions);
  const providers = await getProviders();

  if (session) {
    redirect('/');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-8 sm:px-0 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-center">Noted</h1>
        <p className="text-center text-gray-500">Sign in to continue</p>
      </div>
      <div className="w-full sm:w-[350px] space-y-4">
        <Tabs defaultValue="signUp">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signUp">SignUp</TabsTrigger>
            <TabsTrigger value="signIn">SignIn</TabsTrigger>
          </TabsList>
          <TabsContent value="signUp">
            <SignUpForm />
          </TabsContent>
          <TabsContent value="signIn">
            <SignInForm />
          </TabsContent>
        </Tabs>
        <div className="relative w-full flex items-center justify-center before:-z-10 before:absolute before:[content:''] before:w-full before:h-[1px] before:bg-accent before:top-1/2 before:left-0 before:transform before:-translate-y-1/2">
          <p className="bg-background px-2">or</p>
        </div>
        <Providers providers={providers} />
      </div>
    </div>
  );
};

export default SignInPage;
