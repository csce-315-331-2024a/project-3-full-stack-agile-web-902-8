import { getAllUsers } from "@/lib/user";
import { NextResponse } from 'next/server';
/**
 * api route for the getAllUsers function
 * @returns the result of the getAllUsers function
 */
export async function GET() {
    console.log('GET /api/getAllUsers');
    try {
        const users = await getAllUsers();
        return NextResponse.json(users, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: `Error fetching inventory item names: ${error.message}` },
            { status: 500 }
        );
    }
}

export const dynamic = 'force-dynamic'
