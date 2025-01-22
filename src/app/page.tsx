import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <header>
        <div>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </div>
      </header>
      <h1>Hello, world!</h1>
    </div>
  );
}
