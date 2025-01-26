import HomeHeader from '@/components/home-header';

export default async function Home() {
  return (
    <>
      <HomeHeader />
      <div className="max-w-screen-lg mx-auto">
        <h1>Hello, world!</h1>
      </div>
    </>
  );
}
