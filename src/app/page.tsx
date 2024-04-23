'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


import { getUserSession } from '@/lib/session'

export default async function Home() {
  const user = await getUserSession()
  return <main className="">{JSON.stringify(user)}</main>
}

// export default function Home() {
//     const { push } = useRouter();
//
//     useEffect(() => {
//         push('/customer');
//     }, [push]);
//     return <main>Redirecting...</main>;
// }
