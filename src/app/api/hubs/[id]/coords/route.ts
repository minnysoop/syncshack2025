import { NextResponse } from 'next/server';
import { getHubCoords } from '../../../../../services/hubService';

type RouteContext = { params: { id: string } };

export async function GET(_: Request, context: RouteContext) {
  try {
    const hubId = context.params.id;
    if (!hubId) {
      return NextResponse.json({ error: 'Missing hub id' }, { status: 400 });
    }

    const coords = await getHubCoords(hubId);
    return NextResponse.json(coords, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Server error' }, { status: 404 });
  }
}
