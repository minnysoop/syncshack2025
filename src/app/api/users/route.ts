import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    return NextResponse.json(users);
}

export async function POST(request: Request) {
    const body = await request.json();
    return NextResponse.json({ message: 'User created', data: body });
}