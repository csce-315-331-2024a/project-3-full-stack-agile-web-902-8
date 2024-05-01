'use client';
import UserManager from '@/components/UserManager';

/**
 * Creates the page for the administrator
 * @returns the page for the administrator
 */
export default function Administrator() {
    return (
        <main className="col-[2/3] row-[2/3] overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-4 justify-start">
            <h1 className="text-[4rem] font-bold relative mainHeader w-fit">
                User Manager
            </h1>
            <UserManager />
        </main>
    );
}
