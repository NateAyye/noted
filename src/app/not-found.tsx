import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1>Not Found</h1>
      <p>Could not find requested resource</p>
      <Image
        className="m-0 rounded-xl"
        src="/images/not-found-1024x1024.png"
        alt="Page Not Found"
        title="Page Not Found"
        height={300}
        width={300}
        sizes="300px"
        priority
      />
      <Link href="/">Return Home</Link>
    </div>
  );
}
