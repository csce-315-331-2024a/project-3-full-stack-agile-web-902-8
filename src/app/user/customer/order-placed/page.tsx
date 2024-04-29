'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function OrderPlaced() {
    const router = useRouter();

    const [redirectSeconds, setRedirectSeconds] = useState(5);

    useEffect(() => {
        if (redirectSeconds == 0) {
            router.push('/user/customer');
            return;
        }

        setTimeout(() => {
            setRedirectSeconds((redirectSeconds) => redirectSeconds - 1);
        }, 1000);
    }, [redirectSeconds, router]);

    return (
        <main className="col-[2/3] row-[2/3] overflow-y-auto overflow-x-hidden flex flex-col justify-center items-center">
            <h1 className="text-[4rem] font-bold">
                Your order has been placed
            </h1>
            <p>Redirecting back to menu...</p>
        </main>
    );
}
