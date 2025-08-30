import { NextResponse } from 'next/server';
import { getUserRoleByEmail } from '../../../../services/userService';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    if (!email) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 });
    }

    const user = await getUserRoleByEmail(email);
    return NextResponse.json(user, { status: 200 });
  } catch (err: any) {
    const msg = typeof err?.message === 'string' ? err.message : 'Server error';
    const status = msg === 'User not found' ? 404 : 400;
    return NextResponse.json({ error: msg }, { status });
  }
}
