import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createUser, listUsers } from '../../../services/userService';

const CreateUserSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  role: z.enum(['LESSOR', 'RENTER']),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, role } = CreateUserSchema.parse(body);

    const user = await createUser({ name, email, role });
    return NextResponse.json(user, { status: 201 });
  } catch (err: any) {
    if (err?.issues) {
      return NextResponse.json({ error: 'Invalid payload', details: err.issues }, { status: 400 });
    }
    const msg = typeof err?.message === 'string' ? err.message : 'Server error';
    const status = msg === 'Email already exists' ? 409 : 400;
    return NextResponse.json({ error: msg }, { status });
  }
}

export async function GET() {
  try {
    const users = await listUsers();
    return NextResponse.json(users, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
