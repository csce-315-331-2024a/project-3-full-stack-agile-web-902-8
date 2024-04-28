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
        <div className="h-full w-full flex flex-col justify-center align-center">
            <h1>Order has been placed</h1>
            <p>Redirecting back to menu...</p>
        </div>
    );
}
