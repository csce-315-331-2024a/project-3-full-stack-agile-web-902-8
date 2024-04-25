'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default async function Home() {
    const { push } = useRouter();

    useEffect(() => {
        push('/customer');
    }, [push]);
    return <main>Redirecting...</main>;
}
