'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from '@/app/customer/page.module.css';

export default function OrderPlaced() {
    const router = useRouter();

    const [redirectSeconds, setRedirectSeconds] = useState(5);

    useEffect(() => {
        if (redirectSeconds == 0) {
            router.push('/customer');
            return;
        }

        setTimeout(() => {
            setRedirectSeconds((redirectSeconds) => redirectSeconds - 1);
        }, 1000);
    }, [redirectSeconds, router]);

    return (
        <div id={styles['order-placed']}>
            <h1>Order has been placed</h1>
            <p>Redirecting back to menu...</p>
        </div>
    );
}
