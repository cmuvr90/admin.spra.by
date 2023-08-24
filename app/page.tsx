'use client';

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className='container mx-auto grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>
        <Link href={'/admin'}>ADMIN</Link>
      </div>
    </main>
  );
}
