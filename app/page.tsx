'use client';

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href={'/admin'}>ADMIN</Link>
    </main>
  );
}
